import { React, useState, useRef } from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBBadge,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact'

import { NavLink, useNavigate } from 'react-router-dom'
import { createNewBoard, updateWorkspace } from 'actions/ApiCall'
import { Modal, InputGroup, Button, Form } from 'react-bootstrap'
import AddMemberModal from 'components/Common/AddMember/AddMemberModal'
import { MODAL_ACTION_CONFIRM } from 'utillities/constants'
import './DashBoardBar.scss'

function DashBoardBar(props) {
  const { currentWorkspace, currentUser } = props
  const [modalShow, setModalShow] = useState(false)
  const [modalMemberShow, setModalMemberShow] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const newBoardInputRef = useRef(null)

  const onNewBoardTitleChange = (e) => setNewBoardTitle(e.target.value)

  const onAddMembers = (type, newMemberOrder) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newMemberOrderToAdd = currentWorkspace.memberOrder.concat(newMemberOrder)
      // console.log(newMemberOrderToAdd)
      //Call APIs update workspace
      updateWorkspace(currentWorkspace._id, { memberOrder: newMemberOrderToAdd })
    }
    //Close modal
    setModalMemberShow(false)
  }

  const navigate = useNavigate()

  const addNewBoard = () => {
    if (!newBoardTitle) {
      newBoardInputRef.current.focus()
      return
    }
    const newBoardToAdd = {
      author: currentUser._id,
      workspaceId: currentWorkspace._id,
      userOrder: [currentWorkspace.author],
      title: newBoardTitle.trim()
    }

    // Call APIs
    createNewBoard(newBoardToAdd).then(board => {
      if (board._id) {
        navigate('/board', {
          state: {
            boardId: board._id
          }
        })
      }
      setNewBoardTitle('')
      setModalShow(false)
    })
  }


  return (
    <div className='dashboard-bar'>
      <CDBSidebar className='sidebar' textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            {currentWorkspace.title}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink className="nav-link" exact="true" to="/">
              <CDBSidebarMenuItem icon="columns"
                suffix={
                  <div className="nav-link-icon">
                    <CDBBadge color="danger" borderType="pill">
                      7
                    </CDBBadge>
                    <i onClick={() => setModalShow(true)} className="fa fa-plus"></i>
                  </div>
                }
              >Boards
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/tables">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/members">
              <CDBSidebarMenuItem icon="users"
                suffix={
                  <div className="nav-link-icon">
                    {/* <CDBBadge color="danger" borderType="pill">
                      7
                    </CDBBadge> */}
                    <i onClick={() => setModalMemberShow(true)} className="fa fa-plus"></i>
                  </div>
                }
              >Members</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/calendar">
              <CDBSidebarMenuItem icon="calendar">
                Calendar
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact="true" to="/analytics">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact="true"
              to="/hero404"
              target="_blank"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addNewBoard}>Create</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <AddMemberModal
        modalShow={modalMemberShow}
        onAddMembers={onAddMembers}
      />

    </div>
  )
}

export default DashBoardBar