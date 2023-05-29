import React from 'react'
import './Home.scss'

// custom components
import HomeBar from 'components/HomeBar/HomeBar'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'

function Home() {
  return (
    <div className="trello-container">
      <HomeBar />
      <BoardBar />
      <BoardContent />
    </div>
  )
}

export default Home