import React from 'react'
import whiteLogo from '../images/Wordmark-R-white-RGB-new.png'
import colorLogo from '../images/Wordmark-R-gradient-RGB.png'

//renders the navbar on the homepage
function Nav({authToken, minimal, showModal, setShowModal, setIsSignUp}) {

  //shows the log in modal if the log in button is pressed
  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (

    <nav>
        <div className = "logo-container">
            <img className = "logo" src = {minimal ? colorLogo : whiteLogo} />

        </div>

        {!authToken && !minimal && (<button 
        className = "nav-button"
        onClick = {handleClick}
        disabled = {showModal}
        >Log In</button>)}
    </nav>
  )
}

export default Nav