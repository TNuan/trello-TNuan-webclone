import { React, useState, useRef, useEffect } from 'react'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import './DateTimePicker.scss'

function DateTimePicker(props) {
  const { show, onAction, card } = props
  useEffect(() => {
    const start = new Date(card.createdAt)
    // console.log(start.toISOString().split('T'))
    const date = start.toISOString().split('T')[0]

    let hours = start.getHours()
    let minutes = start.getMinutes()

    if (hours < 10 ) {
      hours = '0' + hours
    }

    if (minutes < 10) { minutes = '0' + minutes }
    const time = `${hours}:${minutes}`
    setStartDate(date)
    setStartTime(time)
  }, [])
  const [startDate, setStartDate] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState([])

  return (
    <Modal
      show={show}
      onHide={() => onAction('close')}
      backdrop="static"
      className="datetimepicker-modal"
      style={{ left: '70%', width: '30%', height: '100%' }}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title className="h5"></Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div>
          Start
          <div className='form-picker'>
            <Form.Control type="date" />
            <Form.Control type="time" />
          </div>
        </div>
        <div>
          End
          <div className='form-picker'>
            <Form.Control type="date" value={startDate} format="dd/MM/yyyy" onChange={(e) => setStartDate(e.target.value)} />
            <Form.Control type="time" value={startTime} placeholder="hrs:mins" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" format="" onChange={(e) => {
              console.log(e.target.value)
              setStartTime(e.target.value)
            }} />
          </div>
        </div>
        <div>
          Set due remider
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Set due remider
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>None</Dropdown.Item>
              <Dropdown.Item>1 hour</Dropdown.Item>
              <Dropdown.Item>1 day</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DateTimePicker