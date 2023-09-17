import { React, useState, useRef, useEffect } from 'react'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap'
import { updateCard } from 'actions/ApiCall'
import { getDateTime } from 'utillities/sort'
import './DateTimePicker.scss'

function DateTimePicker(props) {
  const { show, toggleShowDatePicker, card, onUpdateCardState } = props
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  useEffect(() => {
    let start = new Date(Date.now())
    let end = new Date(Date.now())
    if (card.startAt) {
      start = new Date(card.startAt)
    }
    if (card.endAt) {
      end = new Date(card.endAt)
    }
    const startAt = getDateTime(start)
    const endAt = getDateTime(end)

    setStartTime(startAt)
    setEndTime(endAt)
  }, [])

  const handleOnChangeDateTime = () => {
    const dateStartString = startTime.join('T')
    const dateEndString = endTime.join('T')
    const timestampStart = Date.parse(dateStartString)
    const timestampEnd = Date.parse(dateEndString)
    if (timestampStart !== card.startAt || timestampEnd !== card.endAt) {
      const newCard = {
        ...card,
        startAt: timestampStart,
        endAt: timestampEnd
      }
      updateCard(newCard._id, newCard).then(updatedCard => {
        onUpdateCardState(updatedCard)
      })
    }
    toggleShowDatePicker()
  }
  return (
    <Modal
      show={show}
      onHide={() => toggleShowDatePicker('close')}
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
            <Form.Control type="date"
              value={startTime[0]}
              format="dd/MM/yyyy"
              onChange={(e) => {
                setStartTime([e.target.value, startTime[1]])
              }} />
            <Form.Control type="time"
              value={startTime[1]} placeholder="hrs:mins"
              pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
              format=""
              onChange={(e) => {
                setStartTime([startTime[0], e.target.value])
              }} />
          </div>
        </div>
        <div>
          End
          <div className='form-picker'>
            <Form.Control type="date" value={endTime[0]} format="dd/MM/yyyy"
              onChange={(e) => {
                setEndTime([e.target.value, endTime[1]])
              }} />
            <Form.Control type="time" value={endTime[1]} placeholder="hrs:mins"
              pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
              format=""
              onChange={(e) => {
                setEndTime([endTime[0], e.target.value])
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
        <Button variant="secondary" onClick={() => toggleShowDatePicker()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleOnChangeDateTime()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DateTimePicker