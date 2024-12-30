import React from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'


function Home() {

  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    console.log("clicked")
  
    setShowModal(true)
  }

  const authToken = false

  return (
    <div className="overlay">
      <Nav minimal={false} authToken={authToken} showModal = {showModal} setShowModal = {setShowModal} />
      <div className="home">
        <h1>Swipe Right</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>

        {showModal && (
          <AuthModal setShowModal = {setShowModal}/>
        )}

      </div>
    </div>
  )
}

export default Home