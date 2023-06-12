import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './Home.scss'

// custom components
import HomeBar from 'components/HomeBar/HomeBar'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'
import DashBoardContent from 'components/DashBoardContent/DashBoardContent'
import DashBoardTable from 'components/DashBoardTable/DashBoardTable'

import { getFullWorkspace, getFullUser } from 'actions/ApiCall'
// import { getFullUser } from 'actions/ApiCall'
import DashBoardMembers from 'components/DashBoardMembers/DashBoardMembers'
import DashBoardAnalytics from 'components/DashBoardAnalytics/DashBoardAnalytics'

function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const [workspaces, setWorkspaces] = useState([])
  const [boards, setBoards] = useState([])
  const [members, setMembers] = useState([])
  const [titleSidebar, setTitleSidebar] = useState('')
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
        getFullUser(currentUser._id).then((user) => {
          setWorkspaces(user.workspaces)
        })

        getFullWorkspace(currentUser.workspaceOrder[0], currentUser._id).then(wordspace => {
          setBoards(wordspace.boards),
          setMembers(wordspace.members),
          setTitleSidebar(wordspace.title)
        })
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [currentUser])

  return (
    <div className="trello-container">
      {isLoaded &&
        <>
          <HomeBar currentUser={currentUser} workspaces={workspaces}/>
          <div className='home-container'>
            <DashBoardBar titleSidebar={titleSidebar} />
            <Routes>
              <Route path='/' element={<DashBoardContent boards={boards} />} />
              <Route path='/tables' element={<DashBoardTable currentUser={currentUser} />} />
              <Route path='/members' element={<DashBoardMembers currentUser={currentUser} members={members} />} />
              <Route path='/analytics' element={<DashBoardAnalytics currentUser={currentUser} />} />
            </Routes>
          </div>
        </>
      }
    </div>
  )
}

export default Home