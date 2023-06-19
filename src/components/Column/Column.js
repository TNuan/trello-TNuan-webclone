import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import { CDBBadge, CDBContainer } from 'cdbreact'
import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal'
import { mapOrder } from 'utillities/sort'
import { MODAL_ACTION_CONFIRM } from 'utillities/constants'
import { saveContentAfterPressEnter, selectAllInLineText } from 'utillities/contentEditable'
import { createNewCard, updateColumn } from 'actions/ApiCall/index'
import { updateCard } from 'actions/ApiCall/index'


function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const newCardTextareaRef = useRef(null)
  const newCardLabelRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardLabels, setNewCardLabels] = useState([])
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  // Remove Column
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      // Remove Card on Column
      cards.forEach(card => {
        const newCard = {
          ...card,
          _destroy: true
        }
        // Call APIs update card
        updateCard(card._id, newCard)
      })

      const newColumn = {
        ...column,
        _destroy: true
      }

      // Call APIs update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumnState(updatedColumn)
      })
    }
    toggleShowConfirmModal()
  }

  // Update column title
  const handleColumnTitleBlur = () => {
    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle
      }

      // Call APIs update column
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        updatedColumn.cards = newColumn.cards
        onUpdateColumnState(updatedColumn)
      })
    }
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim(),
      labelOrder: newCardLabels
    }
    console.log(newCardToAdd)

    //Call APIs
    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)

      onUpdateColumnState(newColumn)
      setNewCardTitle('')
      setNewCardLabels([])
      toggleOpenNewCardForm()
    })
  }

  const addLabel = (event) => {
    if (event.currentTarget.classList.contains('selected-label')) {
      event.currentTarget.classList.remove('selected-label')
      let newLabels = [...newCardLabels]
      newLabels.splice(newLabels.indexOf(event.currentTarget.textContent), 1)
      setNewCardLabels(newLabels)
    } else {
      event.currentTarget.classList.add('selected-label')
      let newLabels = [...newCardLabels]
      newLabels.push(event.currentTarget.textContent)
      setNewCardLabels(newLabels)
    }
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="nuandev-contenteditable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInLineText}
            onMouseDown={e => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column...</Dropdown.Item>
              <Dropdown.Item >Move all card(beta)...</Dropdown.Item>
              <Dropdown.Item >Move all card(beta)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          // onDragStart={e => console.log('drag started', e)}
          // onDragEnd={e => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column._id)
          // }}
          // onDragLeave={() => {
          //   console.log('drag leave:', column._id)
          // }}
          // onDropReady={p => console.log('Drop ready: ', p)}
          orientation="vertical"
          groupName="col"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >

          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>

        {openNewCardForm &&
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => {
                (event.key === 'Enter') && addNewCard()
              }}
            />
            <div className="add-new-card-label" ref={newCardLabelRef}>
              <CDBBadge onClick={addLabel} className="primary-label" borderType="pill">
                Primary
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="secondary-label" borderType="pill">
                Secondary
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="success-label" borderType="pill">
                Success
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="danger-label" borderType="pill">
                Danger
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="warning-label" borderType="pill">
                Warning
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="info-label" borderType="pill">
                Info
              </CDBBadge>
              <CDBBadge onClick={addLabel} className="dark-label" borderType="pill">
                Dark
              </CDBBadge>
            </div>
          </div>
        }
      </div>

      <footer>
        {openNewCardForm &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon" />
            </span>
          </div>
        }

        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" /> Add another card
          </div>
        }
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure to remove <strong>${column.title}</strong>. <br /> All related cards will also be remove`}
      />
    </div>
  )
}

export default Column
