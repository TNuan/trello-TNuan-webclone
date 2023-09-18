import React, { useState, useEffect } from 'react'
import { Container as BootstrapContainer, Table } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashBoardTable.scss'

import { getAllCardWorkpace } from 'actions/ApiCall'

import {
  CDBBadge
} from 'cdbreact'

function DashBoardTable(props) {
  const { currentUser, currentWorkspace } = props
  const [cardItems, setCardItems] = useState([])
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (currentWorkspace.boardOrder && currentUser) {
      getAllCardWorkpace({ boardOrder: currentWorkspace.boardOrder }).then((cardItems) => {
        setCardItems(cardItems)
      })
    }
  }, [currentUser, currentWorkspace])


  return (
    <div className="dashboard-tables">
      <BootstrapContainer className='dashboard-container'>
        <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>Card</th>
              <th>Board</th>
              <th>Label</th>
              <th>Member</th>
            </tr>
          </thead>
          <tbody>
            {
              cardItems.map((cardItem, index) => (
                <tr key={index}>
                  <td>{cardItem.title}</td>
                  <td>{cardItem.board.title}</td>
                  <td>
                    <div className='label-card'>
                      {cardItem.labelOrder && cardItem.labelOrder.map((label, index) => (
                        <CDBBadge key={index} className={label.toLowerCase() + '-label'} borderType="pill">
                          {label}
                        </CDBBadge>
                      ))
                      }
                    </div>
                  </td>
                  <td>{cardItem.members.map((member) => member.username)}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </BootstrapContainer>

    </div>
  )
}

export default DashBoardTable
