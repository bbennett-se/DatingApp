import React from 'react'
import whiteLogo from '../images/Wordmark-R-white-RGB-new.png'
import colorLogo from '../images/Wordmark-R-gradient-RGB.png'

function Nav({minimal, showModal, setShowModal, setIsSignUp}) {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  const authToken = true

  return (

    <nav>
        <div className = "logo-container">
            <img className = "logo" src = {minimal ? colorLogo : whiteLogo} />

        </div>

        {!authToken && !minimal && <button 
        className = "nav-button"
        onClick = {handleClick}
        disabled = {showModal}
        >Log In</button>}
    </nav>
  )
}

export default Nav