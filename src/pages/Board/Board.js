import React from 'react'
import './Board.scss'

// custom components
import BoardBar from 'components/BoardBar/BoardBar'
import HomeBar from 'components/HomeBar/HomeBar'
import BoardContent from 'components/BoardContent/BoardContent'
import { useLocation, useParams } from 'react-router-dom'

function Board() {
  const location = useLocation()
  return (
    <div className="trello-container">
      <HomeBar />
      <BoardBar />
      <BoardContent boardId={location.state.boardId}/>
    </div>
  )
}

export default Board