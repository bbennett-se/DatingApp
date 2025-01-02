import React from 'react'

function Chat({ descendingOrderMessages }) {
  return (
    <div  className = 'chat-display'>
        { descendingOrderMessages.map((message, _index) => (
          <div key = { _index }>
            <div className = 'chat-message-header'>
              <div classname = 'image-container'><img src = {message.img}alt = {message.first_name + ' profile'}/></div>
              <p>{message.name}</p>
            </div>
            <p>{message.message}</p>
          </div>
        ))}
    </div>
  )
}

export default Chat