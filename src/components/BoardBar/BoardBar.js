import React from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'

import './BoardBar.scss'

function BoardBar() {
  return (
    <nav className="navbar-board">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Workspace luan</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-space">
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add member</NavDropdown.Item>
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
    </nav>
  )
}

export default BoardBar
