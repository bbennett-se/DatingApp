import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function ChatInput({ user, clickedUser, getUsersMessages, getClickedUserMessages }) {

    const [textArea,setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
      const message = {
        timestamp: new Date().toISOString(),
        user_id: userId,
        to_user_id: clickedUserId,
        message: textArea
      }

      try {
        await axios.post('http://localhost:8000/message', { message })
        getUsersMessages()
        getClickedUserMessages()
        setTextArea("") 
      } catch(err) {
        console.log(err)
      }
    }
  return (
    <div className = 'chat-input'>
        <textarea value = {textArea} onChange = {(e) => setTextArea(e.target.value)}/>
    <button className = 'secondary-button'>Submit</button>
    </div>
  )
}

export default ChatInput