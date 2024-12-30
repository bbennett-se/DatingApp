import React from 'react'

import whiteLogo from '../images/Wordmark-R-white-RGB-new.png'
import colorLogo from '../images/Wordmark-R-gradient-RGB.png'

function Nav({minimal, authToken}) {

  return (
    <nav>
        <div className = "logo-container">
            <img className = "logo" src = {minimal ? colorLogo : whiteLogo} />

        </div>

        {!authToken && <button className = "nav-button">Log In</button>}
    </nav>
  )
}

export default Nav