import React from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBBadge,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact'

import { NavLink } from 'react-router-dom'

function DashBoardBar(props) {
  return (
    <div className='dashboard-bar'>
      <CDBSidebar className='sidebar' textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Code List
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact="true" to="/">
              <CDBSidebarMenuItem icon="columns"
                suffix={
                  <CDBBadge color="danger" borderType="pill">
                    pro
                  </CDBBadge>
                }
              >Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/tables">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/profile">
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