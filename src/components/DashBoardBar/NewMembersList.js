import React, { useEffect } from 'react'
import {
  CDBBadge
} from 'cdbreact'
import './NewMemberList.scss'

export default function NewMembersList(props) {

  const { newMembersToAdd, onDeleteMembersToAdd } = props

  const members = newMembersToAdd.map((user, index) => (
    <div className="badge" key={index}>
      {user.username}
      <span className="delete-icon" onClick={() => {onDeleteMembersToAdd(index)}}>&times;</span>
    </div>
  ))

  return <div className='newmember-list'>{members}</div>
}
