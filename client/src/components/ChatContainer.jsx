import React from 'react'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import {useState} from 'react'

function ChatContainer( { user }) {

  const [clickedUser, setClickedUser] = useState(null)
  return (
    <div className = 'chat-container'>
        <ChatHeader user = { user } setClickedUser = { setClickedUser }/>

        <div>
            <button className = 'option' onClick = {() => setClickedUser(null)}>Matches</button>
            <button className = 'option' disabled = {!clickedUser}>Chat</button>
        </div>

        {!clickedUser && <MatchesDisplay matches = { user.matches }/>}
        {clickedUser && <ChatDisplay/>}
    </div>
  )
}

export default ChatContainer