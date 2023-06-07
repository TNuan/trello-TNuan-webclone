import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap'
import { isEmpty, cloneDeep } from 'lodash'

import './DashBoard.scss'
import { getDashBoardUser } from 'actions/ApiCall'

function DashBoard() {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('trello-user')) {
        navigate('/login')
      } else {
        const data = JSON.parse(localStorage.getItem('trello-user'))
        setCurrentUser(data)
        getDashBoardUser(data._id).then(boards => {
          setBoards(boards)
        })
        setIsLoaded(true)
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [])


  return (
    <div className="dashboard">
      <BootstrapContainer className='dashboard-container'>
        <Row>
          {boards.map((board, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>{board.title}</Card.Title>
                  <Card.Text>{board.title}</Card.Text>
                  <Button variant="primary">View</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </BootstrapContainer>
    </div>
  )
}

export default DashBoard
