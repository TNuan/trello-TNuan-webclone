import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'
import { mapOrder } from 'utillities/sort'
import { applyDrag } from 'utillities/dragDrop'

import { initialData } from 'actions/initialData'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumn] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const newColumnInputRef = useRef(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

  useEffect(() => {
    const boardFromDB = initialData.board.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)

      setColumn(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return ( <div className="not-found">Board not found</div> )
  }

  const onColumnDrop = (dropResult) => {
    // console.log(dropResult)
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = newColumns
    setColumn(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(col => col.id === columnId)

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(item => item.id)

      setColumn(newColumns)
    }
  }

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), // random a string has 5 characters
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = newColumns

    setColumn(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }

  return (
    <div className="board-content">
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
            <Column column={column} onCardDrop={onCardDrop}/>
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="board-content-container">

        {!openNewColumnForm &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" /> Add new column
            </Col>
          </Row>
        }

        {openNewColumnForm &&
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm" type="text" placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span className="cancel-new-column" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon"/>
              </span>
            </Col>
          </Row>
        }

      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
