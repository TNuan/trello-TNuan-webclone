import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Button, Card } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'

import './DashBoardContent.scss'
import { getDashBoardUser } from 'actions/ApiCall'

function DashBoardContent(props) {
  const navigate = useNavigate()
  const { boards } = props

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
            <div key={index} className="col-xl-4 col-lg-6 mb-4">
              <Card style={{ width: '16rem' }}>
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
