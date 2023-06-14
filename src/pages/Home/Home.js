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
  const [currentWorkspace, setcurrentWorkspace] = useState({})
  const [boards, setBoards] = useState([])
  const [members, setMembers] = useState([])
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

        getFullWorkspace(currentUser.workspaceOrder[0], currentUser._id).then(workspace => {
          setcurrentWorkspace(workspace)
          setBoards(workspace.boards)
          setMembers(workspace.members)
        })
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [isLoaded, currentUser])


  const onUpdateWorkspaceState = (newWorkspaceToUpdate) => {
    const workspaceIdToUpdate = newWorkspaceToUpdate._id
    let newWorkspaces = [...workspaces]
    const workspaceIndexToUpdate = newWorkspaces.findIndex(item => item._id === workspaceIdToUpdate)

    if (newWorkspaceToUpdate._destroy && workspaceIndexToUpdate) {
      // remove workspace
      newWorkspaces.splice(workspaceIndexToUpdate, 1)
    } else if (workspaceIndexToUpdate) {
      // update workspace info
      newWorkspaces.splice(workspaceIndexToUpdate, 1, newWorkspaceToUpdate)
    } else {
      // create new workspace
      newWorkspaces.push(newWorkspaceToUpdate)
    }

    // let updateCurrentUser = { ...currentUser }
    // updateCurrentUser.workspaceOrder = newWorkspaces.map(workspace => workspace._id)
    // updateCurrentUser.workspaces = newWorkspaces

    // setCurrentUser(updateCurrentUser)
    setWorkspaces(newWorkspaces)

    getFullWorkspace(newWorkspaceToUpdate._id, currentUser._id).then(workspace => {
      setcurrentWorkspace(workspace)
      setBoards(workspace.boards)
      setMembers(workspace.members)
    })
  }

  return (
    <div className="trello-container">
      {isLoaded &&
        <>
          <HomeBar currentUser={currentUser} workspaces={workspaces} onUpdateWorkspaceState={onUpdateWorkspaceState} />
          <div className='home-container'>
            <DashBoardBar currentWorkspace={currentWorkspace} currentUser={currentUser} onUpdateWorkspaceState={onUpdateWorkspaceState}/>
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