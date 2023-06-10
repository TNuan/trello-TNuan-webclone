import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Button, Card } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'

import './DashBoardContent.scss'
import { getDashBoardUser } from 'actions/ApiCall'

function DashBoardContent(props) {
  const navigate = useNavigate()
  const { currentUser } = props
  const [boards, setBoards] = useState([])
  // const [currentUser, setCurrentUser] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    (async () => {
      if (currentUser) {
        getDashBoardUser(currentUser._id).then(boards => {
          setBoards(boards)
        })
        setIsLoaded(true)
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [])

  const showBoard = (boardId) => {
    if (boardId) {
      navigate('/views', {
        state: {
          boardId: boardId
        }
      })
    }
  }

  return (
    <div className="dashboard">
      <DashBoardBar/>
      <BootstrapContainer className='dashboard-container'>
        <Row>
          {boards.map((board, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>{board.title}</Card.Title>
                  <Card.Text>{board.title}</Card.Text>
                  <Button onClick={() => showBoard(board._id)}>
                    view
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </BootstrapContainer>
    </div>
  )
}

export default DashBoardContent
