import React, { useEffect, useState } from 'react'
import { updateCard } from 'actions/ApiCall/index'

import './Card.scss'

function Card(props) {
  const { card, onUpdateCardState } = props

  const [cardTitle, setCardTitle] = useState('')
  const handleCardTitleChange = (e) => setCardTitle(e.target.value)

  useEffect(() => {
    setCardTitle(card.title)
  }, [card.title])

  const handleCardTitleBlur = () => {
    if (cardTitle !== card.title) {
      const newCard = {
        ...card,
        title: cardTitle
      }
      // Call APIs update Card
      updateCard(newCard._id, newCard).then(updatedCard => {
        onUpdateCardState(updatedCard)
      })
    }
  }

  return (
    <div className="card-item">
      {card.cover && <img src={card.cover} onMouseDown={e => e.preventDefault()} className="card-cover" alt="nuan-alt-img"/>}
      {card.title}
    </div>
  )
}

export default Card