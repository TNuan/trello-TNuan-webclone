import React from 'react'
import './Home.scss'

// custom components
import HomeBar from 'components/HomeBar/HomeBar'
import BoardBar from 'components/BoardBar/BoardBar'
import DashBoard from 'components/DashBoardContent/DashBoardContent'
import BoardContent from 'components/BoardContent/BoardContent'

function Home() {
  return (
    <div className="trello-container">
      <HomeBar />
      {/* <BoardBar /> */}
      {/* <BoardContent /> */}
      <DashBoard />
    </div>
  )
}

export default Home