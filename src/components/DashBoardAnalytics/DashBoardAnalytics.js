import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { CDBContainer } from 'cdbreact'
import { Container as BootstrapContainer } from 'react-bootstrap'
import DashBoardBar from 'components/DashBoardBar/DashBoardBar'
import './DashBoardAnalytics.scss'

const DashBoardAnalytics = () => {
  const [data] = useState({
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'Active',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: 'Done',
        backgroundColor: 'rgba(71, 225, 167, 0.5)',
        borderColor: 'rgb(71, 225, 167)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  })

  return (
    <div className="dashboard-analytics">
      <DashBoardBar />
      <BootstrapContainer className='dashboard-container'>
        <CDBContainer>
          <h3 className="mt-5">Bar chart</h3>
          <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>

        <CDBContainer>
          <h3 className="mt-5">Bar chart</h3>
          <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>

        <CDBContainer>
          <h3 className="mt-5">Bar chart</h3>
          <Bar data={data} options={{ responsive: true }} />
        </CDBContainer>
      </BootstrapContainer>
    </div>
  )
}

export default DashBoardAnalytics