import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; 
import { signInWithPopup } from "firebase/auth";

const StartPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleStart = () => {
        setShowModal(true); // Show confirmation modal before navigating
    };

    // const confirmStart = async () => {
    //     setShowModal(false);
    //     if (!auth.currentUser) { // Check if user is not logged in
    //         try {
    //             await signInWithPopup(auth, provider); // Attempt Google Sign-In
    //             // After signing in, navigate to the Exam page
    //             navigate('/exam'); 
    //         } catch (error) {
    //             console.error("Error signing in: ", error);
    //             alert("Login failed. Please try again.");
    //         }
    //     } else {
    //         navigate('/exam'); // Navigate to the exam page directly if already logged in
    //     }
    // };

    const confirmStart = () => {
        setShowModal(false);
        navigate('/auth'); // Navigate to the auth page
    };

    const cancelStart = () => {
        setShowModal(false); // Close modal if the user cancels
    };

    return (
        <div className="start-page-container">
            
            <nav className="navbar">
                <h1 className="logo">WriteRight</h1>
                <ul>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How it Works</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <section className="hero-section">
                <h1>Welcome to WriteRight</h1>
                <p>The modern AI-powered essay grading application designed to help you improve your writing skills.</p>
                <button className="start-btn" onClick={handleStart}>Start Exam</button>
            </section>

            
            <section id="features" className="features-section">
                <h2>Features</h2>
                <p>WriteRight offers instant grading, detailed feedback, and tips to help you improve your essay writing.</p>
            </section>

            
            <section id="how-it-works" className="how-it-works-section">
                <h2>How It Works</h2>
                <p>Start your exam, write your essay, and get real-time feedback powered by AI technology.</p>
            </section>

            
            <footer>
                <p>&copy; 2024 WriteRight - All Rights Reserved</p>
            </footer>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Start Exam</h2>
                        <p>Once the exam starts, you won’t be able to leave the page until it’s completed.</p>
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={confirmStart}>Confirm</button>
                            <button className="cancel-btn" onClick={cancelStart}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;
