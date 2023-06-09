import React, { useState, useRef } from 'react'
import { Container, Navbar, Row, Nav, NavDropdown, Button, Modal, InputGroup, Form } from 'react-bootstrap'
import './HomeBar.scss'

import { createNewBoard } from 'actions/ApiCall'

function HomeBar(props) {
  const { currentUser } = props
  const [modalShow, setModalShow] = useState(false)
  const [visibility, setVisibility] = useState('Workspace')
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const newBoardInputRef = useRef(null)
  const onNewBoardTitleChange = (e) => setNewBoardTitle(e.target.value)

  const addNewBoard = () => {
    if (!newBoardTitle) {
      newBoardInputRef.current.focus()
      return
    }

    const data = JSON.parse(localStorage.getItem('trello-user'))
    const newBoardToAdd = {
      author: data._id,
      title: newBoardTitle.trim()
    }

    //Call APIs
    createNewBoard(newBoardToAdd).then(Board => {
      setNewBoardTitle('')
      setModalShow(false)
    })
  }

  return (
    <nav className="navbar-home">
      <Navbar collapseOnSelect expand="lg" className='navbar'>
        <Container>
          <Navbar.Brand href="/">Trello</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Workspace" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Workspace 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Workspace 2
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Workspace 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Workspace 4
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Button onClick={() => setModalShow(true)}>Create</Button>
              <Nav.Link href="#deets">{currentUser.username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a new board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className='input-text'>Title</InputGroup.Text>
            <Form.Control
              size="sm" type="text" placeholder="Enter column title..."
              className="input-enter-new-column"
              ref={newBoardInputRef}
              value={newBoardTitle}
              onChange={onNewBoardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewBoard()}
            />
          </InputGroup>

          {/* <InputGroup>
            <InputGroup.Text className='input-text'>Description</InputGroup.Text>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>

          <InputGroup className='mt-3'>
            <InputGroup.Text className='input-text'>Visibility</InputGroup.Text>
            <DropdownButton id="dropdown-basic-button" title={visibility}>
              <Dropdown.Item onClick={() => setVisibility('Private')}>Private</Dropdown.Item>
              <Dropdown.Item onClick={() => setVisibility('Workspace')}>Workspace</Dropdown.Item>
              <Dropdown.Item onClick={() => setVisibility('Public')}>Public</Dropdown.Item>
            </DropdownButton>
          </InputGroup> */}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNewBoard}>Create</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  )
}

export default HomeBar
