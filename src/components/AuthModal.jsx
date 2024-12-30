import React from 'react'


function AuthModal({setShowModal}) {

    const handleClick = () => {
        setShowModal(false)
    }

    return (
        <div className = "auth-modal">
        <div onClick = {handleClick}>
            X
        </div>
        AUTH MODAL
        </div>
    )
}

export default AuthModal