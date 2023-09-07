import React from 'react'
import './Board.scss'

// custom components
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { API_ROOT } from 'utillities/constants'
import { fetchBoardDetails } from 'actions/ApiCall'
import { mapOrder } from 'utillities/sort'

function Board() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [board, setBoard] = useState({})
  const [columns, setColumn] = useState([])
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

  useEffect(() => {
    fetchBoardDetails(location.state.boardId).then(board => {
      setBoard(board)
      setColumn(mapOrder(board.columns, board.columnOrder, '_id'))
      setIsLoaded(true)
    })
  }, [])

  return (
    <div className="trello-container">
      <BoardBar board={board} columns={columns} />
      <BoardContent
        isLoaded={isLoaded}
        board={board}
        columns={columns}
        setBoard={setBoard}
        setColumn={setColumn}
        socket={socket}
        currentUser={currentUser} />
    </div>
  )
}

export default Board