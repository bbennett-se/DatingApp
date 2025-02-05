import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

//renders the auth modal on the homepage
function AuthModal({ setShowModal, isSignUp }) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)

    //hides the modal when clicked
    const handleClick = () => {
        setShowModal(false)
    }

    //submits the user info to the database if it is valid
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError("Passwords must match")
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)

            const success = response.status === 201

            //determines which page to send the user to depending on if they are signed up or not
            if (success && isSignUp) navigate('/onboarding')
            if (success && !isSignUp) navigate('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>
                ✖
            </div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <p>By Clicking Log In, you agree to our terms. learn how we process your data in our Privacy Policy and Cookie Policy</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="secondary-button" type="submit" />
                <p>{error}</p>

            </form>
            <hr />
            <h2>Get The App</h2>
        </div>
    )
}

export default AuthModal