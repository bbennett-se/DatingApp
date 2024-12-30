import React from 'react'
import { useState } from 'react'
import Nav from '../components/Nav'

function Onboarding() {

  const handleSubmit = () => {
    console.log("submitted")
  }

  const handleChange = () => {
    console.log("changed")
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
              id="first-name"
              type="text"
              name="first-name"
              placeholder="first name"
              required={true}
              value={""}
              onChange={handleChange} />

            <label>Birthday</label>
            <div classname="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={""}
                onChange={handleChange} />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={""}
                onChange={handleChange} />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={""}
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
                checked={false} />

              <label htmlFor="man-gender-identity">Man</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={false} />

              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={false} />

              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show my gender on my profile</label>

            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={false} />

            <label>Show me</label>
            <div className="multiple-input-container" >
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={false} />

              <label htmlFor="man-gender-interest">Man</label>

              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={false} />

              <label htmlFor="woman-gender-interest">Woman</label>

              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={false} />

              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>

            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={""}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="photo">Profile Photo</label>
            <div className="photo-container">
              <input
                type="url"
                name="url"
                id="url"
                onChange={handleChange}
                required={true} />
            </div>
          </section>
        </form>

      </div>
    </>
  )
}

export default Onboarding