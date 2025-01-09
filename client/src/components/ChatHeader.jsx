import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

//renders the chat header that displays the user's name and the option to log out
function ChatHeader({ user }) {

  let navigate = useNavigate()
  
  const[cookies,setCookie, removeCookie] = useCookies(['user'])
  const[pfp, setPfp] = useState(null)

  //removes UserId and AuthToken cookies from the browser and redirects the user back to the homepage
  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)

    navigate('/')
    console.log("logged out")
  }

  function readPicture(e) {
    const file = user.images
    const reader = new FileReader()

    reader.onload = function() {
      setPfp(reader.result)
    }
  
    reader.readAsDataURL(file) 
  }
  
  return (
    <div className = 'chat-container-header'>
        <div className = 'profile'>
            <div className = 'img-container'>
                <img src = {pfp} alt = {"photo of " + user.first_name}/>
            </div>
            <h3>{user.first_name}</h3>
        </div>
        <i className = 'log-out-icon' onClick = {logout}>⬅</i>
    </div>
  )
}

export default ChatHeader