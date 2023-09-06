import React from 'react'
import './Board.scss'

// custom components
import BoardBar from 'components/BoardBar/BoardBar'
import HomeBar from 'components/HomeBar/HomeBar'
import BoardContent from 'components/BoardContent/BoardContent'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { API_ROOT } from 'utillities/constants'

function Board() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const socket = useRef()

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('trello-user')) {
        navigate('/login')
      } else {
        const data = await JSON.parse(localStorage.getItem('trello-user'))
        setCurrentUser(data)
        setIsLoaded(true)
        socket.current = io(API_ROOT)
        socket.current.emit('createUser', data._id)
        socket.current.emit('joinBoard', location.state.boardId)
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [])


  return (
    <div className="trello-container">
      <BoardBar />
      <BoardContent boardId={location.state.boardId} socket={socket} currentUser={currentUser} />
    </div>
  )
}

export default Board