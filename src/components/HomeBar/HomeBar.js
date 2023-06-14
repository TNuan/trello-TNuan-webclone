import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown, Button, Modal, InputGroup, Form } from 'react-bootstrap'
import './HomeBar.scss'

import { createNewWorkspace } from 'actions/ApiCall'

function HomeBar(props) {
  const { currentUser, workspaces, onUpdateWorkspaceState } = props
  const [modalShow, setModalShow] = useState(false)
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('')
  const newWorkspaceInputRef = useRef(null)
  const onNewWorkspaceTitleChange = (e) => setNewWorkspaceTitle(e.target.value)
  const navigate = useNavigate()

  const addNewWorkspace = () => {
    if (!newWorkspaceTitle) {
      newWorkspaceInputRef.current.focus()
      return
    }

    const newWorkspaceToAdd = {
      author: currentUser._id,
      title: newWorkspaceTitle.trim()
    }

    //Call APIs
    createNewWorkspace(newWorkspaceToAdd).then(workspace => {
      onUpdateWorkspaceState(workspace)
      setNewWorkspaceTitle('')
      setModalShow(false)
    })
  }

  // const updateWorkspaceState = (workspaceId) => {
  //   if (workspaceId) {
  //     navigate('/workspace', {
  //       state: {
  //         workspaceId: workspaceId
  //       }
  //     })
  //   }
  // }

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
                {
                  workspaces.map((workspace, index) => (
                    <NavDropdown.Item onClick={() => onUpdateWorkspaceState(workspace)} key={index}>{workspace.title}</NavDropdown.Item>
                  ))
                }
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
            Create a new workspace
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className='input-text'>Title</InputGroup.Text>
            <Form.Control
              size="sm" type="text" placeholder="Enter column title..."
              className="input-enter-new-column"
              ref={newWorkspaceInputRef}
              value={newWorkspaceTitle}
              onChange={onNewWorkspaceTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewWorkspace()}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNewWorkspace}>Create</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  )
}

export default HomeBar
