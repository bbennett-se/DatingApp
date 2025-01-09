import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'

//renders the onboarding screen
function Onboarding() {


  const [cookies, setCookie, removeCookie] = useCookies(null)

  //defines the structure of the formData that will be updated and passed to the database
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    images: "",
    about: "",
    matches: []
  })

  const[ preview, setPreview ] = useState(null)

  let navigate = useNavigate()

  //submits inputted user data to the database and updates the user's account data
  const handleSubmit = async (e) => {

    //TODO: Set up so that images are stored in cloudinary
    //TODO: Research a way to retrieve cloudinary image urls within the database
    
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      if (success) {
        navigate('/dashboard')
        console.log("submitted")
      }
    } catch (err) {
      console.log(err)
    }
  }

  //handles updating the value of checkboxes in formData
  const handleChange = (e) => {

    if(e.target.type == 'file') {
      readPicture(e)
    }


    const value = e.target.type == 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))

    
  }

  function readPicture(e) {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = function() {
      setPreview(reader.result)
    }
  
    reader.readAsDataURL(file) 
  }



  
  return (
    <>
      <Nav
        minimal={true}
        showModal={() => { }}
        setShowModal={false} />

      <div className="onboarding">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="first name"
              required={true}
              value={formData.first_name}
              onChange={handleChange} />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange} />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange} />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_day.dob_year}
                onChange={handleChange} />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === 'man'} />

              <label htmlFor="man-gender-identity">Man</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === 'woman'} />

              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === 'more'} />

              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show my gender on my profile</label>

            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.showGender} />

            <label>Show me</label>
            <div className="multiple-input-container" >
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === 'man'} />

              <label htmlFor="man-gender-interest">Man</label>

              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === 'woman'} />

              <label htmlFor="woman-gender-interest">Woman</label>

              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === 'everyone'} />

              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>

            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="photo">Profile Photo</label>
            <input
              type="file"
              accept = ".jpg, .jpeg, .png"
              name="images"
              id="images"
              onChange={handleChange}
              required={true} />

            <div className="photo-container">
              {formData.images && <img src={preview} alt="profile pic preview" />}
            </div>
          </section>
        </form>

      </div>
    </>
  )
}

export default Onboarding