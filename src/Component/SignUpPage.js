// src/Components/SignupPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; 
import { signInWithPopup } from "firebase/auth";

const SignupPage = () => {
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            await signInWithPopup(auth, provider); // Google Sign-In for signup
            navigate('/login'); // Redirect to login page after signup
        } catch (error) {
            console.error("Error signing up: ", error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-page-container">
            <h1>Signup Page</h1>
            <button className="signup-button" onClick={handleSignup}>Sign Up with Google</button>
        </div>
    );
};

export default SignupPage;
