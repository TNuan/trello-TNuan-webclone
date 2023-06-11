import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './Home.scss'

// custom components
import HomeBar from 'components/HomeBar/HomeBar'
import DashBoardContent from 'components/DashBoardContent/DashBoardContent'
import DashBoardTable from 'components/DashBoardTable/DashBoardTable'
import BoardContent from 'components/BoardContent/BoardContent'

import { getFullWorkspace } from 'actions/ApiCall'
import DashBoardMembers from 'components/DashBoardMembers/DashBoardMembers'
import DashBoardAnalytics from 'components/DashBoardAnalytics/DashBoardAnalytics'

function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [boards, setBoards] = useState([])
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('trello-user')) {
        navigate('/login')
      } else {
        const data = await JSON.parse(localStorage.getItem('trello-user'))
        setCurrentUser(data)
        setIsLoaded(true)
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [])

  useEffect(() => {
    (async () => {
      if (isLoaded && currentUser) {

        getFullWorkspace(currentUser.workspaceOrder[0], currentUser._id).then(wordspace => {
          setBoards(wordspace.boards)
        })
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [currentUser])

  // const onUpdateWorkSpaceState = (newColumnToUpdate) => {
  //   const columnIdToUpdate = newColumnToUpdate._id

  //   let newColumns = [...columns]
  //   const columnIndexToUpdate = newColumns.findIndex(item => item._id === columnIdToUpdate)
  //   if (newColumnToUpdate._destroy) {
  //     // remove column
  //     newColumns.splice(columnIndexToUpdate, 1)
  //   } else {
  //     //update column info
  //     newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
  //   }

  //   let newBoard = { ...board }
  //   newBoard.columnOrder = newColumns.map(col => col._id)
  //   newBoard.columns = newColumns

  //   setColumn(newColumns)
  //   setBoard(newBoard)
  // }

  return (
    <div className="trello-container">
      {isLoaded &&
        <>
          <HomeBar currentUser={currentUser} />
          <Routes>
            {/* <Route path='/hello/' element={<DashBoardContent currentUser={currentUser} />} /> */}
            <Route path='/' element={<DashBoardContent boards={boards} />} />
            <Route path='/views' element={<BoardContent />} />
            <Route path='/tables' element={<DashBoardTable currentUser={currentUser}/>} />
            <Route path='/members' element={<DashBoardMembers currentUser={currentUser}/>} />
            <Route path='/analytics' element={<DashBoardAnalytics currentUser={currentUser}/>} />
          </Routes>
        </>
      }
    </div>
  )
}

export default Home