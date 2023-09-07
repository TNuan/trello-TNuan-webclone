import { React, useState } from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import { MODAL_ACTION_CONFIRM } from 'utillities/constants'
import AddMemberModal from 'components/Common/AddMember/AddMemberModal'

import './BoardBar.scss'

function BoardBar() {
  const [modalMemberShow, setModalMemberShow] = useState(false)

  const onAddMembers = (type, newMemberOrder) => {
    if (type === MODAL_ACTION_CONFIRM) {
      // Handle and call api
    }

    //Close modal
    setModalMemberShow(false)
  }

  return (
    <nav className="navbar-board">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Workspace luan</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-space">
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setModalMemberShow(true)}>Add member</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Change visibility
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Change board title</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className='delete-item'>
                Delete board
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
          <Navbar.Text>
            <a href="/login">Luan123</a>
          </Navbar.Text>
        </Container>
      </Navbar>

      <AddMemberModal
        modalShow={modalMemberShow}
        onAddMembers={onAddMembers}
      />
    </nav>
  )
}

export default BoardBar
