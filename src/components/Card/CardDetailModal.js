import { Modal, Button, Form } from 'react-bootstrap'
import { CDBBadge } from 'cdbreact'
import HTMLReactParser from 'html-react-parser'
import { React, useState, useRef } from 'react'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import './CardDetailModal.scss'

function CardDetailModal(props) {
  const { card, show, onAction } = props
  const [cardTitle, setCardTitle] = useState('')
  const [cardDescription, setCardDescription] = useState(card.description)
  const newCardTextareaRef = useRef(null)


  const handleCardDescriptionBlur = () => {
    if (cardTitle !== card.title) {
      const newCard = {
        ...card,
        title: cardTitle
      }
      // Call APIs update Card
      // updateCard(newCard._id, newCard).then(updatedCard => {
      //   onUpdateCardState(updatedCard)
      // })
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => onAction('')}
      backdrop="static"
      keyboard={false}
      animation={false}
      className='modal-card-detail modal-lg'
    >
      <Modal.Header closeButton>
        <Modal.Title className="h2">{HTMLReactParser(card.title)}</Modal.Title>
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
            <h4>
              <i className="fa fa-align-left" aria-hidden="true"></i>
              Description
              <Form.Control
                size="sm"
                as="textarea"
                rows="3"
                placeholder="Enter a description for this card..."
                className="textarea-enter-new-card"
                ref={newCardTextareaRef}
                // value={newCardDescription}
                // onChange={onNewCardTitleChange}
                // onKeyDown={event => {
                //   (event.key === 'Enter') && addNewCard()
                // }}
              />
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
          <Button>
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            Dates
          </Button>
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
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CardDetailModal