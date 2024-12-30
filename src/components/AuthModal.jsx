import React from 'react'
import { useState } from 'react'


function AuthModal({ setShowModal, setIsSignUp, isSignUp }) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(email,password,confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = () => {
        e.preventDefault()
        
        try {
            if(isSignUp && (password !== confirmPassword)) {
                setError("Passwords must match")
            }
            console.log("make a post request to the database")
            
            } catch(error) {
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

                <input className = "secondary-button" type = "submit"/>
                <p>{error}</p>

            </form>
            <hr/>
            <h2>Get The App</h2>
        </div>
    )
}

export default AuthModal