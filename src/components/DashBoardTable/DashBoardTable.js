import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Container as BootstrapContainer, Row, Button, Card } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'

import './DashBoardTable.scss'

function DashBoardTable(props) {


  return (
    <div className="dashboard">
      <DashBoardBar/>
      
    </div>
  )
}

export default DashBoardTable
