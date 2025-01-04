import React from 'react'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import ChatContainer from '../components/ChatContainer'

//Renders the user Dashboard
function Dashboard() {

  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId


  //gets user info of UserId stored in cookies from the database
  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:8000/user', {
              params: {userId}
          })
          setUser(response.data)

      } catch (error) {
          console.log(error)
      }
  }

  //gets a list of users that match the user's gender interest
  const getGenderedUsers = async () => {
      try {
          const response = await axios.get('http://localhost:8000/gendered-users', {
              params: {gender: user?.gender_interest}
          })

          setGenderedUsers(response.data)

      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getUser()
  }, [])

  useEffect(() => {
      if (user) {
          getGenderedUsers()
      }
  }, [user])

  //adds to the user's match array if they swipe right on another user
  const updateMatches = async (matchedUserId) => {
      try {
          await axios.put('http://localhost:8000/addmatch', {
              userId,
              matchedUserId
          })

          getUser()

      } catch (err) {
          console.log(err)
      }
  }


  //detects which way a user swiped on a user's profile card; passes info to updateMatches
  const swiped = (direction, swipedUserId) => {
      if (direction === 'right') {
          updateMatches(swipedUserId)
      }
      setLastDirection(direction)
  }

  //logs when the user has swiped on another user's profile card
  const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
  }

  //gets the user_ids of profiles that the user has already matched with
  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

  //filters the contents of the user's card queue based on users that they have not matched with yet
  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  return (
      <>
          {user &&
          <div className="dashboard">
              <ChatContainer user={ user }/>
              <div className="swipe-container">
                  <div className="card-container">

                      {filteredGenderedUsers?.map((genderedUser) =>
                          <TinderCard
                              className="swipe"
                              key={genderedUser.user_id}
                              onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                              onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                              <div className="card"
                                  style={{backgroundImage: "url(" + genderedUser.url + ")"}}>
                                  <h3>{genderedUser.first_name}</h3>
                              </div>
                          </TinderCard>
                      )}
                      <div className="swipe-info">
                          {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                      </div>
                  </div>
              </div>
          </div>}
      </>
  )
}

export default Dashboard
