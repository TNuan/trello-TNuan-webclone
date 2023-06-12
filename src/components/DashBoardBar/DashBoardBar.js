import React from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBBadge,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBIcon
} from 'cdbreact'

import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function DashBoardBar(props) {
  const { titleSidebar } = props
  return (
    <div className='dashboard-bar'>
      <CDBSidebar className='sidebar' textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            {titleSidebar}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact="true" to="/">
              <CDBSidebarMenuItem icon="columns"
                suffix={
                  <CDBBadge color="danger" borderType="pill">
                    7
                  </CDBBadge>
                }
              >Boards
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/tables">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/members">
              <CDBSidebarMenuItem icon="users">Members</CDBSidebarMenuItem>
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
    </div>
  )
}

export default DashBoardBar