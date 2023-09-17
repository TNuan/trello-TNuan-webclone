import React, { useState, useEffect } from 'react'  
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './DashBoardTable.scss'

import { getAllCardWorkpace } from 'actions/ApiCall'

function DashBoardTable(props) {
  const { currentUser, currentWorkspace } = props
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (currentWorkspace.boardOrder && currentUser) {
      getAllCardWorkpace({ boardOrder: currentWorkspace.boardOrder }).then((cardItems) => {
        const eventsData = cardItems.reduce((accumulator, cardItem) => {
          let eventData = {
            start: moment(cardItem.startAt),
            end: moment(cardItem.endAt),
            title: cardItem.title
          }
          accumulator.push(eventData)
          return accumulator
        }, [])
        setEvents(eventsData)
      })
    }
  }, [currentUser, currentWorkspace])


  return (
    <div className="dashboard-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}

export default DashBoardTable
