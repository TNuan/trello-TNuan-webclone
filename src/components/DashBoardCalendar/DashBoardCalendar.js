import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import './DashBoardCalendar.scss'

import { getAllCardWorkpace } from 'actions/ApiCall'

function DashBoardCalendar(props) {
  const { currentUser, currentWorkspace } = props
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (currentWorkspace.boardOrder && currentUser) {
      getAllCardWorkpace({ boardOrder: currentWorkspace.boardOrder }).then((cardItems) => {
        const eventsData = cardItems.reduce((accumulator, cardItem) => {
          let eventData = {
            start: new Date(cardItem.startAt),
            end: new Date(cardItem.endAt),
            title: cardItem.title,
            allDay: true
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
        className='calendar'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onShowMore={(events, date) => this.setState({ showModal: true, events })}
      />
    </div>
  )
}

export default DashBoardCalendar
