import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Button, Card, Table } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'
import './DashBoardTable.scss'

import {
  CDBBadge
} from 'cdbreact'

function DashBoardTable(props) {
  const { currentUser } = props

  return (
    <div className="dashboard-tables">
      <DashBoardBar />
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
            <tr>
              <td>This is title of card ....</td>
              <td>Board name 1</td>
              <td>
                <div className='label-card'>
                  <CDBBadge color="danger" borderType="pill">
                    label 1
                  </CDBBadge>
                  <CDBBadge color="success" borderType="pill">
                    this is success
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 7899
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    labe
                  </CDBBadge>
                  <CDBBadge color="secondary" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="primary" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="success" borderType="pill">
                    label 234234
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    label 33
                  </CDBBadge>
                  <CDBBadge color="danger" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 2
                  </CDBBadge>
                </div>

              </td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>This is title of card ....</td>
              <td>Board name 1</td>
              <td>
                <div className='label-card'>
                  <CDBBadge color="danger" borderType="pill">
                    label 1
                  </CDBBadge>
                  <CDBBadge color="primary" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="success" borderType="pill">
                    label 234234
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    label 33
                  </CDBBadge>
                  <CDBBadge color="danger" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 2
                  </CDBBadge>
                </div>

              </td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>This is title of card ....</td>
              <td>Board name 1</td>
              <td>
                <div className='label-card'>
                  <CDBBadge color="danger" borderType="pill">
                    label 1
                  </CDBBadge>
                  <CDBBadge color="success" borderType="pill">
                    this is success
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 7899
                  </CDBBadge>
                  <CDBBadge color="dark" borderType="pill">
                    label 33
                  </CDBBadge>
                  <CDBBadge color="danger" borderType="pill">
                    label 2
                  </CDBBadge>
                  <CDBBadge color="warning" borderType="pill">
                    label 2
                  </CDBBadge>
                </div>

              </td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </BootstrapContainer>
    </div>
  )
}

export default DashBoardTable
