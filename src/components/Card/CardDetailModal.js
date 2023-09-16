import { Modal, Button, Form, FormCheck } from 'react-bootstrap'
import { CDBBadge } from 'cdbreact'
import HTMLReactParser from 'html-react-parser'
import { React, useState, useRef } from 'react'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import { saveContentAfterPressEnter, selectAllInLineText } from 'utillities/contentEditable'
import DateTimePicker from 'components/Common/DateTimePicker'
import { getDateTime } from 'utillities/sort'
import { updateCard } from 'actions/ApiCall'
import './CardDetailModal.scss'


function CardDetailModal(props) {
  const { card, show, onAction } = props
  const [cardTitle, setCardTitle] = useState(card.title)
  // const newCardTextareaRef = useRef(null)
  const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false)
  const toggleShowDatePicker = () => setIsShowDateTimePicker(!isShowDateTimePicker)

  const [cardDescription, setCardDescription] = useState(card.description)
  const handleCardDescriptionChange = (e) => setCardDescription(e.target.value)
  const handleCardTitleChange = (e) => setCardTitle(e.target.value)

  const handleCardDescriptionBlur = () => {
    if (cardDescription !== card.description) {
      const newCard = {
        ...card,
        description: cardDescription
      }

      //Call APIs update Card
      updateCard(newCard._id, newCard).then(updatedCard => {
        // onUpdateCardState(updatedCard)
      })
    }
  }

  const handleCardTitleBlur = () => {
    if (cardTitle !== card.title) {
      const newCard = {
        ...card,
        title: cardTitle
      }

      //Call APIs update Card
      updateCard(newCard._id, newCard).then(updatedCard => {
        // onUpdateCardState(updatedCard)
      })
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => onAction('')}
      backdrop="static"
      className='modal-card-detail modal-lg'
    >
      <Modal.Header closeButton>
        <Modal.Title className="h2">
          <div className="title-card-detail">
            <Form.Control
              size="sm"
              type="text"
              className="nuandev-contenteditable"
              value={cardTitle}
              onChange={handleCardTitleChange}
              onBlur={handleCardTitleBlur}
              onKeyDown={saveContentAfterPressEnter}
              onClick={selectAllInLineText}
              onMouseDown={e => e.preventDefault()}
              spellCheck="false"
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='content-card-detail'>
        <div className="body-card-detail">
          <div className="label-and-noti">
            <div>
              <h5>
                {/* <i className="fa fa-tags" aria-hidden="true"></i> */}
                Labels
              </h5>
              <div className="label-detail">
                {card.labelOrder &&
                  <div className="card-labels">
                    {card.labelOrder.map((label, i) => (
                      <CDBBadge key={i} className={label.toLowerCase() + '-label label-item'} borderType="pill">
                        {label}
                      </CDBBadge>)
                    )}
                    <Button className=""><i className="fa fa-plus" aria-hidden="true"></i></Button>
                  </div>
                }
              </div>
            </div>
            <div>
              <h5>
                {/* <i className="fa fa-tags" aria-hidden="true"></i> */}
                Notifications
              </h5>
              <Button>
                <i className="fa fa-eye" aria-hidden="true"></i>
                Watch
              </Button>
            </div>
          </div>
          <div>
            <h5>
              Due date
            </h5>
            <div>
              <FormCheck></FormCheck>
              {card.endAt &&
                <div>
                  {
                    getDateTime(new Date(card.endAt)).join(' at ')
                  }
                </div>
              }
            </div>
          </div>
          <div>
            <h4>
              <i className="fa fa-align-left" aria-hidden="true"></i>
              Description
              <div className="card-description">
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows="3"
                  className="nuandev-contenteditable"
                  value={cardDescription}
                  onChange={handleCardDescriptionChange}
                  onBlur={handleCardDescriptionBlur}
                  onKeyDown={saveContentAfterPressEnter}
                  onClick={selectAllInLineText}
                  onMouseDown={e => e.preventDefault()}
                // spellCheck="false"
                />
              </div>
            </h4>

          </div>
          <div>
            <h4>
              <i className="fa fa-list-ul" aria-hidden="true"></i>
              Activity
            </h4>
            <div>
              <img src="img_girl.jpg" alt="avatar" width="500" height="600" />
              <input type="text" placeholder="Write a comment" />
            </div>
          </div>
        </div>
        {/* {HTMLReactParser(card.description)} */}
        <div className="nav-card-detail">
          <h5>Add to card</h5>
          <Button>
            <i className="fa fa-user" aria-hidden="true"></i>
            Members
          </Button>
          <Button>
            <i className="fa fa-tags" aria-hidden="true"></i>
            Labels
          </Button>
          <Button>
            <i className="fa fa-check-square-o" aria-hidden="true"></i>
            Checklist
          </Button>
          <Button onClick={() => toggleShowDatePicker()}>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            Dates
          </Button>
          <DateTimePicker show={isShowDateTimePicker} toggleShowDatePicker={toggleShowDatePicker} card={card} />
          <Button>
            <i className="fa fa-paperclip" aria-hidden="true"></i>
            Attachment
          </Button>
          <Button>
            <i className="fa fa-picture-o" aria-hidden="true"></i>
            Cover
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default CardDetailModal