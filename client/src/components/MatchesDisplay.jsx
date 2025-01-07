import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

//renders component that displays matches for the user
function MatchesDisplay({ matches, setClickedUser }) {

  const [matchedProfiles, setMatchedProfiles] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)

  //gets the user_id of all matches passed from the chat container 
  const matchedUserIds = matches.map(({ user_id }) => user_id)
  const userId = cookies.UserId

  //gets all profiles that a user has sent a like to 
  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })

      setMatchedProfiles(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMatches();
  }, [matches])

  //filters for profiles that have also liked the user(matches) 
  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id == userId)
        .length > 0
  )

  return (
    <div className='matches-display'>
      {filteredMatchedProfiles?.map((match, _index) => (
        <div key={_index} className='match-card' onClick={ () => setClickedUser(match)}>

          <div className='img-container'>
            <img src={match?.images} alt={match?.first_name + ' profile'} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}

    </div>
  )
}

export default MatchesDisplay