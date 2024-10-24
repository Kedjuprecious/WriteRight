import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; 
import { signInWithPopup } from "firebase/auth";
const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider); 
            navigate('/exam'); 
        } catch (error) {
            console.error("Error logging in: ", error);
            alert("Login failed. Please try again.");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/exam'); // Redirect to exam page if user is already logged in
            }
        });

        return () => unsubscribe(); 
    }, [navigate]);

    return (
        <div className="login-page-container">
            <h1>Login Page</h1>
            <button className="login-button" onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default LoginPage;
