import React from 'react'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import ChatContainer from '../components/ChatContainer'

function Dashboard() {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)

  const userId = cookies.UserId
  
  const getUser = async () => {

    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })

      setUser(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

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
    <>
    { user && 
      <div className="dashboard">
      <ChatContainer user = { user }/>
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

          <div className='swipe-info'>
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div> 
    
  }
  </>
  )
}

export default Dashboard
