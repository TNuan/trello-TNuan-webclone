import React from 'react'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utillities/constants'
import SearchRecommendation from './SearchRecommendation'
import NewMembersList from './NewMembersList'
import { Modal, InputGroup, Button, Form } from 'react-bootstrap'
import { searchUsers } from 'actions/ApiCall'
import { useState, useRef } from 'react'


function AddMemberModal(props) {
  const { modalShow, onAddMembers } = props
  const [newMembersToAdd, setNewMemberToAdd] = useState([])
  const [newMemberInput, setNewMemberInput] = useState('')
  const [newMemberRecommendation, setNewMemberRecommendation] = useState([])
  const newMemberInputRef = useRef(null)

  // Call api search user
  const onNewMemberChange = (e) => {
    setNewMemberInput(e.target.value)
    if (e.target.value) {
      searchUsers(e.target.value).then(users => {
        setNewMemberRecommendation(users)
      })
    } else {
      setNewMemberRecommendation([])
    }
  }

  // Select members
  const onSelectRecommendation = (selectMember) => {
    setNewMemberInput('')
    newMemberInputRef.current.focus()
    setNewMemberRecommendation([])
    if (!newMembersToAdd.find((member) => member._id === selectMember._id)) {
      let newMems = [...newMembersToAdd]
      newMems.push(selectMember)
      setNewMemberToAdd(newMems)
    }
  }

  // Disable select members
  const onDeleteMembersToAdd = (index) => {
    setNewMemberInput('')
    newMemberInputRef.current.focus()
    setNewMemberRecommendation([])
    let newMems = [...newMembersToAdd]
    newMems.splice(index, 1)
    setNewMemberToAdd(newMems)
  }

  const addNewMembers = () => {
    if (!newMembersToAdd) {
      newMemberInputRef.current.focus()
      return
    }

    const newMemberOrder = newMembersToAdd.reduce((acc, currentMember) => {
      acc.push(currentMember._id)
      return acc
    }, [])

    onAddMembers(MODAL_ACTION_CONFIRM, newMemberOrder)
  }

  return (
    <Modal
      show={modalShow}
      onHide={() => onAddMembers(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add member to workspace
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewMembersList newMembersToAdd={newMembersToAdd} onDeleteMembersToAdd={onDeleteMembersToAdd} />
        <InputGroup className="mb-3">
          <Form.Control
            size="sm" type="text" placeholder="Enter username or email..."
            className="input-enter-new-column"
            ref={newMemberInputRef}
            value={newMemberInput}
            onChange={onNewMemberChange}
            onKeyDown={event => (event.key === 'Enter') && {}}
          />
        </InputGroup>
        <SearchRecommendation newMemberRecommendation={newMemberRecommendation} onSelectRecommendation={onSelectRecommendation} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addNewMembers}>Add</Button>
        <Button onClick={() => onAddMembers(MODAL_ACTION_CLOSE)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddMemberModal

