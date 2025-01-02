import React from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useEffect, useState } from 'react'

function ChatDisplay({ user, clickedUser }) {
  const userId = user?.user_id
  const clickedUserId = clickedUser?.userId
  const [usersMessages, setUsersMessages] = useState(null)
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

  const getUserMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: userId, correspondingUserId: clickedUserId }
      })

      setUsersMessages(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  const getClickedUserMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: clickedUserId, correspondingUserId: userId }
      })

      setClickedUsersMessages(response.data)

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getUserMessages(userId, clickedUserId)
    getClickedUserMessages(clickedUserId, userId)
  }, [])

  const messages = []

  usersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = user?.first_name
    formattedMessage['img'] = user?.url
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  clickedUsersMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedUser?.first_name
    formattedMessage['img'] = clickedUser?.url
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput user={user} clickedUser={clickedUser} getUsersMessages={getUserMessages} getClickedUserMessages={getClickedUserMessages} />
    </>
  )
}

export default ChatDisplay