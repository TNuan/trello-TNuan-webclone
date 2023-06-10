import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Button, Card, Table } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'
import './DashBoardMembers.scss'

function DashBoardMembers(props) {
  const { currentUser } = props

  const onClickFunction = () => {
    console.log('onClickFunction')
  }

  return (
    <div className="dashboard-tables">
      <DashBoardBar />
      <BootstrapContainer className='dashboard-container'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last  Name</th>
              <th>Username</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Otto</td>
              <td>Sudo</td>
              <td>@mdo</td>
              <td>
                <i onClick="onClickFunction()" className="fa fa-trash"></i>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Thornton</td>
              <td>John</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </BootstrapContainer>
    </div>
  )
}

export default DashBoardMembers
