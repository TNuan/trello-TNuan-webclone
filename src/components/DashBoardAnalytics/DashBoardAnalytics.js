import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { CDBContainer } from 'cdbreact'
import { Container as BootstrapContainer } from 'react-bootstrap'
import { getAllCardWorkpace } from 'actions/ApiCall'
import './DashBoardAnalytics.scss'

const DashBoardAnalytics = (props) => {
  const { currentUser, currentWorkspace } = props
  const [cardItems, setCardItems] = useState([])
  const [data, setData] = useState({
    labels: ['Primary', 'Secondary', 'Danger', 'Warning', 'Info', 'Success', 'Dark'],
    datasets: [
      {
        label: 'Active',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'Done',
        backgroundColor: 'rgba(71, 225, 167, 0.5)',
        borderColor: 'rgb(71, 225, 167)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  })

  // useEffect(() => {
  //   if (currentWorkspace.boardOrder && currentUser) {
  //     getAllCardWorkpace({ boardOrder: currentWorkspace.boardOrder }).then((cardItems) => {
  //       setCardItems(cardItems)
  //     })
  //   }
  // }, [currentUser, currentWorkspace])

  // const initialValue = {
  //   haveLabel: [],
  //   noLabel: 0
  // }
  // const labelName = ['Primary', 'Secondary', 'Danger', 'Warning', 'Info', 'Success', 'Dark']
  // const dataLabel = cardItems.reduce((accumulator, currentValue) => {
  //   if (currentValue.labelOrder) {
  //     accumulator.haveLabel = accumulator.haveLabel.concat(currentValue.labelOrder)
  //     return accumulator
  //   } else {
  //     accumulator.noLabel++
  //     return accumulator
  //   }
  // }, initialValue)

  // const dataToSet = labelName.reduce((accumulator, currentLabel) => {
  //   const dataHaveLabel = dataLabel.haveLabel.filter(item => item === currentLabel).length
  //   accumulator.push(dataHaveLabel)
  //   return accumulator
  // }, [dataLabel.noLabel])

  // useEffect(() => {
  //   console.log(dataToSet)
  //   setData({
  //     labels: ['Nolabel', 'Primary', 'Secondary', 'Danger', 'Warning!', 'Info', 'Success', 'Dark'],
  //     datasets: [
  //       {
  //         label: 'Active',
  //         backgroundColor: 'rgba(194, 116, 161, 0.5)',
  //         borderColor: 'rgb(194, 116, 161)',
  //         data: [0, 0, 0, 0, 0, 0, 0, 0]
  //       }
  //     ]
  //   })
  // }, [])

  return (
    <div className="dashboard-analytics">
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