import React, { useEffect, useState } from 'react'
import { useNavigate, Route, Routes, BrowserRouter } from 'react-router-dom'
import './Home.scss'

// custom components
import HomeBar from 'components/HomeBar/HomeBar'
import DashBoardContent from 'components/DashBoardContent/DashBoardContent'
import BoardContent from 'components/BoardContent/BoardContent'

function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('trello-user')) {
        navigate('/login')
      } else {
        const data = await JSON.parse(localStorage.getItem('trello-user'))
        setCurrentUser(data)
        setIsLoaded(true)
      }
    })()
      // eslint-disable-next-line no-console
      .catch(console.error)
  }, [])

  return (
    <div className="trello-container">
      {isLoaded &&
        <>
          <HomeBar currentUser={currentUser} />
          <Routes>
            {/* <Route path='/hello/' element={<DashBoardContent currentUser={currentUser} />} /> */}
            <Route path='/' element={<DashBoardContent currentUser={currentUser} />} />
            <Route path='/views' element={<BoardContent />} />
          </Routes>
        </>
      }
    </div>
  )
}

export default Home