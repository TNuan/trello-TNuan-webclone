import React from 'react'
import './Board.scss'

// custom components
import BoardBar from 'components/BoardBar/BoardBar'
import HomeBar from 'components/BoardBar/HomeBar'
import BoardContent from 'components/BoardContent/BoardContent'

function Board() {
  return (
    <div className="trello-container">
      <HomeBar />
      <BoardBar />
      <BoardContent />
    </div>
  )
}

export default Board