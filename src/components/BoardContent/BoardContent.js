import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty, cloneDeep } from 'lodash'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { applyDrag } from 'utillities/dragDrop'
import { createNewColumn, updateBoard, updateColumn, updateCard } from 'actions/ApiCall/index'

function BoardContent(props) {
  const { socket, currentUser, board, columns, setBoard, setColumn, isLoaded } = props
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const newColumnInputRef = useRef(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  useEffect(() => {
    if (socket.current) {
      socket.current.on('updateBoards', (username, newColumns, newBoard) => {
        if (username != currentUser._id) {
          setColumn(newColumns)
          setBoard(newBoard)
        }
      })
    }
  })

  const onColumnDrop = (dropResult) => {
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(col => col._id)
    newBoard.columns = newColumns

    setColumn(newColumns)
    setBoard(newBoard)
    socket.current.emit('sendUpdateBoards', newColumns, newBoard)
    // Call api update ColumnOrder in board details.
    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumn(columns)
      setBoard(board)
    })
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)

      let currentColumn = newColumns.find(col => col._id === columnId)

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(item => item._id)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(col => col._id)
      newBoard.columns = newColumns

      setColumn(newColumns)
      setBoard(newBoard)

      socket.current.emit('sendUpdateBoards', newColumns, newBoard)

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action move card inside its column
         * Call api update cardOrder in current column
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => setColumn(columns))
      } else {
        /**
         * Action move card between two columns
         * Call api update cardOrder in current column
         *
         */
        updateColumn(currentColumn._id, currentColumn).catch(() => setColumn(columns))

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          // Call api update columnId in current card
          updateCard(currentCard._id, currentCard)/* .catch(() => setCard) */
        }
      }
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }

    //Call APIs
    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(col => col._id)
      newBoard.columns = newColumns

      setColumn(newColumns)
      setBoard(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
      socket.current.emit('sendUpdateBoards', newColumns, newBoard)
    })
  }

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(item => item._id === columnIdToUpdate)
    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      //update column info
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(col => col._id)
    newBoard.columns = newColumns

    setColumn(newColumns)
    setBoard(newBoard)
    socket.current.emit('sendUpdateBoards', newColumns, newBoard)
  }

  return (
    <div className="board-content">
      {isLoaded && (
        <>
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            getChildPayload={index => columns[index]}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'column-drop-preview'
            }}
          >
            {columns.map((column, index) => (
              <Draggable key={index}>
                <Column
                  column={column}
                  onCardDrop={onCardDrop}
                  onUpdateColumnState={onUpdateColumnState} />
              </Draggable>
            ))}
          </Container>
          <BootstrapContainer className="board-content-container">

            {!openNewColumnForm &&
              <Row>
                <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
                  <i className="fa fa-plus icon" /> Add new column
                </Col>
              </Row>}

            {openNewColumnForm &&
              <Row>
                <Col className="enter-new-column">
                  <Form.Control
                    size="sm" type="text" placeholder="Enter column title..."
                    className="input-enter-new-column"
                    ref={newColumnInputRef}
                    value={newColumnTitle}
                    onChange={onNewColumnTitleChange}
                    onKeyDown={event => (event.key === 'Enter') && addNewColumn()} />
                  <Button variant="success" size="sm" onClick={addNewColumn}>
                    Add column
                  </Button>
                  <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                    <i className="fa fa-trash icon" />
                  </span>
                </Col>
              </Row>}

          </BootstrapContainer>
        </>
      )
      }
    </div>
  )
}

export default BoardContent
