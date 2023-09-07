import React from 'react'
import './SearchRecommendation.scss'

export default function SearchRecommendation(props) {
  const { newMemberRecommendation, onSelectRecommendation } = props
  const options = newMemberRecommendation.map(user => (
    <div key={user._id} className='search-result' onClick={() => {onSelectRecommendation(user)}}>
      {user.username}
    </div>
  ))

  return <div className="select-list">{options}</div>
}
