import React from 'react'
import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import ChatContainer from '../components/ChatContainer'

function Dashboard() {

  const db = [
    {
      name: 'Richard Hendricks',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://imgur.com/oPj4A8u.jpg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://imgur.com/oPj4A8u.jpg'
    }
  ]

  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing:' + nameToDelete)
    setLastDirection(direction)
  }
  return (
    <div className="dashboard">
      <ChatContainer />
      <div className="swipe-container">
        <div className="card-container">

          {characters.map((character) =>
            <TinderCard 
            className='swipe' 
            key={character.name} 
            onSwipe={(dir) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}>

              <div 
              style={{ backgroundImage: 'url(' + character.url + ')' }} 
              className='card'>

                <h3>{character.name}</h3>
              </div>

            </TinderCard>
          )}

          <div className = 'swipe-info'>
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
