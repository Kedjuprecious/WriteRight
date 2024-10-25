import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; 
import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";

const AuthPage = () => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;

            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length === 0) {
                setErrorMessage("You need to register first before logging in.");
                auth.signOut(); // Log the user out if they haven't registered
            } else {
                navigate('/exam');
            }
        } catch (error) {
            console.error("Error logging in: ", error);
            setErrorMessage("Login failed. Please try again.");
        }
    };

    const handleSignup = async () => {
        try {
            await signInWithPopup(auth, provider);
            setShowLoginModal(true); // Show the modal after successful signup
        } catch (error) {
            console.error("Error signing up: ", error);
            setErrorMessage("Signup failed. Please try again.");
        }
    };

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <div className="auth-page-container">
            <h1>Authentication</h1>
            <button className="login-button" onClick={handleLogin}>Login with Google</button>
            <p>Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleSignup}>Register</span></p>

            {/* Go Back to Start Button */}
            <button className="go-back-button" onClick={handleGoBack}>Go Back to Start</button>

            {/* Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Login Modal after successful registration */}
            {showLoginModal && (
                <div className="modal-overlay-signup">
                    <div className="modal-signup">
                        <h2 className='registration-successful'>Registration Successful!</h2>
                        <p className='login-signup'>Click the button below to proceed with login.</p>
                        <button className='login-btn' onClick={() => {
                            setShowLoginModal(false);
                            handleLogin();
                        }}>Go to Login</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
