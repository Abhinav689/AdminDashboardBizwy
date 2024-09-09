import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';

const Home = () => {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    

    const handleLogout = () => {
        doSignOut().then(() => {
           
            navigate('/login');
        });
    };

    // Determine which username to display
    const displayName = currentUser?.displayName || username || 'User';

    return (
        <div className="relative min-h-screen bg-gray-100">
            {userLoggedIn && (
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                        Logout
                    </button>
                </div>
            )}
            <div className="flex flex-col items-center justify-center h-full">
                <div className="text-2xl font-bold">
                    <h1>Welcome, {displayName}!</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
