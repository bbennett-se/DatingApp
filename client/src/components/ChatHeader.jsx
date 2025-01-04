import React from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

//renders the chat header that displays the user's name and the option to log out
function ChatHeader({ user }) {

  let navigate = useNavigate()
  
  const[cookies,setCookie, removeCookie] = useCookies(['user'])

  //removes UserId and AuthToken cookies from the browser and redirects the user back to the homepage
  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)

    navigate('/')
    console.log("logged out")
  }
  
  return (
    <div className = 'chat-container-header'>
        <div className = 'profile'>
            <div className = 'img-container'>
                <img src = {user.url} alt = {"photo of " + user.first_name}/>
            </div>
            <h3>{user.first_name}</h3>
        </div>
        <i className = 'log-out-icon' onClick = {logout}>#</i>
    </div>
  )
}

export default ChatHeader