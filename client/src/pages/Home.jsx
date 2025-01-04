import React from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

import clouds from '../images/213455_small.mp4'

// Renders the Home Screen
function Home() {

  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.authToken


  //Handles Sign out (Might be redundant. possibly remove later)
  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
    }

    setShowModal(true)
    setIsSignUp(true)
  }

  return (

    <>
    

    <div className="overlay">
      <div className = "video-container">
    <video autoPlay muted loop className = 'video'>
        <source src={clouds} type='video/mp4'/>
      </video>
      </div>
      <Nav
        authToken={authToken}
        minimal={false}
        showModal={showModal}
        setShowModal={setShowModal}
        setIsSignUp={setIsSignUp} />

      <div className="home">

        <h1 className="primary-title">Swipe Right</h1>

        <button className="primary-button"
          onClick={handleClick}>

          {authToken ? 'Signout' : 'Create Account'}

        </button>

        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            isSignUp={isSignUp} />
        )}

      </div>
    </div>
    </>
  )
}

export default Home