import React, { useEffect, useState } from 'react'
import { updateCard } from 'actions/ApiCall/index'
import { CDBBadge } from 'cdbreact'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'

import './Card.scss'
import CardDetailModal from './CardDetailModal'

function Card(props) {
  const { card, onUpdateCardState } = props

  const [cardTitle, setCardTitle] = useState('')
  const handleCardTitleChange = (e) => setCardTitle(e.target.value)
  const [showCardDetailModal, setShowCardDetailModal] = useState(false)
  const toggleShowCardDetailModal = () => setShowCardDetailModal(!showCardDetailModal)

  useEffect(() => {
    setCardTitle(card.title)
  }, [card.title])

  // const handleCardTitleBlur = () => {
  //   if (cardTitle !== card.title) {
  //     const newCard = {
  //       ...card,
  //       title: cardTitle
  //     }
  //     // Call APIs update Card
  //     updateCard(newCard._id, newCard).then(updatedCard => {
  //       onUpdateCardState(updatedCard)
  //     })
  //   }
  // }


  const onConfirmModalAction = (action) => {
    if (action === MODAL_ACTION_CONFIRM) {
      // do something

    }
    toggleShowCardDetailModal()
  }

  return (
    <div>
      <div className="card-item" onClick={() => toggleShowCardDetailModal()}>
        {card.cover && <img src={card.cover} onMouseDown={e => e.preventDefault()} className="card-cover" alt="nuan-alt-img" />}
        {card.title}
        {card.labelOrder &&
          <div className="card-labels">
            {card.labelOrder.map((label, i) => (
              <CDBBadge key={i} className={label.toLowerCase() + '-label label-item'} borderType="pill">
              </CDBBadge>)
            )}
          </div>
        }
        <div className='card-item-icon'>
          {card.description &&
            <i className="fa fa-align-left" aria-hidden="true"></i>
          }
          {card.endAt &&
            <button className="card-item-due">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {(new Date(card.endAt)).toISOString().split('T')[0]}
            </button>
          }
          {card.fileAttachment &&
            <i className="fa fa-paperclip" aria-hidden="true">1</i>
          }
        </div>


      </div>
      <CardDetailModal
        card={card}
        show={showCardDetailModal}
        onAction={onConfirmModalAction}
        onUpdateCardState={onUpdateCardState}
      />
    </div>

  )
}

export default Card