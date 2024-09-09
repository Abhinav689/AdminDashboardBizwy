import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Logo from '../../logo.png';


const Register = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const validateEmail = (email) => {
        // Basic email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateMobileNumber = (number) => {
        const mobileRegex = /^\d{10,15}$/;
        return mobileRegex.test(number);
    };

    const validateUsername = (username) => {
        // Check if username already exists in local storage
        const storedUsername = localStorage.getItem('username');
        return storedUsername === username;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Invalid email address.');
            return;
        }

        if (!validateMobileNumber(mobileNumber)) {
            toast.error('Enter a valid mobile number');
            return;
        }

        if (validateUsername(username)) {
            toast.error('Username already exists. Try another.');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                // Check if OTP is verified before creating the account
                if (isOtpVerified) {
                    await doCreateUserWithEmailAndPassword(email, password);
                    localStorage.setItem('username', username);
                    Swal.fire({
                        icon: 'success',
                        title: 'Account Created Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    <Navigate to={'/dashboard'} replace={true} />
                } else {
                    setErrorMessage('Please verify your mobile number.');
                }
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    const sendOtp = () => {
        if (!validateMobileNumber(mobileNumber)) {
            toast.error('Enter a valid mobile number (10-15 digits).');
            return;
        }

        // Simulate sending OTP
        setIsOtpSent(true);
        toast.success('OTP sent to your mobile number.');
    };

    const verifyOtp = () => {
        // Simulate OTP verification
        if (otp === '123456') { // Replace with actual OTP verification logic
            setIsOtpVerified(true);
            toast.success('Mobile number verified successfully.');
        } else {
            toast.error('Invalid OTP.');
        }
    };

    return (
        <div>
            <Toaster />
            {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-128 text-gray-600 space-y-5 p-6 shadow-2xl border rounded-xl bg-white">
                    <div className="text-center mb-6">
                        <img src={Logo} style={{ marginLeft: "6rem" , width:"150px" ,height:"50px" }} alt='Bizwy' />
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Business Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* Username Input */}
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Username</label>
                            <input
                                type="text"
                                autoComplete='username'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full mt-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {/* Email Input */}
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                            {/* Error Message */}
                            {errorMessage && errorMessage.includes("auth/email-already-in-use") && (
                                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                            )}
                        </div>
                        {/* Mobile Number Input */}
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Mobile Number</label>
                            <PhoneInput
                                country={'in'}
                                value={mobileNumber}
                                onChange={setMobileNumber}
                                inputClass="w-full mt-3 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                            <button
                                type="button"
                                onClick={sendOtp}
                                disabled={isOtpSent}
                                className={`w-full px-4 py-2 mt-2 text-white font-medium rounded-lg ${isOtpSent ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                            >
                                {isOtpSent ? 'OTP Sent' : 'Send OTP'}
                            </button>
                        </div>
                        {isOtpSent && (
                            <div>
                                <label className="text-sm text-gray-600 font-bold">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full mt-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={verifyOtp}
                                    disabled={isOtpVerified}
                                    className={`w-full px-4 py-2 mt-2 text-white font-medium rounded-lg ${isOtpVerified ? 'bg-green-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                                >
                                    {isOtpVerified ? 'Mobile Verified' : 'Verify OTP'}
                                </button>
                            </div>
                        )}
                        {/* Password Input */}
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Password</label>
                            <input
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                            {/* Error Message */}
                            {errorMessage && errorMessage === 'Passwords do not match.' && (
                                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                            )}
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {' '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Login</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;
