import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    return (
        <div>
            {userLoggedIn ? (
                <button 
                    onClick={() => { 
                        doSignOut().then(() => { 
                            navigate('/login') 
                        }) 
                    }} 
                    className='text-sm text-blue-600 underline'>
                    Logout
                </button>
            ) : (
                <p className='text-sm text-gray-600'></p>
            )}
       </div>
    )
}

export default Header
