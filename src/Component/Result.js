import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';

const Result = ({ grade, question, essay, message }) => { // Added message as a prop
    const navigate = useNavigate();
    
    const { 
        "Task Achievement": taskAchievement, 
        "Coherence and Cohesion": coherenceCohesion, 
        "Vocabulary": vocabulary, 
        "Grammar": grammar, 
        "Overall": overall 
    } = grade;

    const handleLogout = () => {
        auth.signOut();
        navigate('/');
    }; // Added missing closing bracket

    return (
        <div className="result-container">
            <h2>Your Grade Breakdown:</h2>
            <div className="grades-section">
                <p><strong>Task Achievement:</strong> <span className="grade">{taskAchievement}</span></p>
                <p><strong>Coherence and Cohesion:</strong> <span className="grade">{coherenceCohesion}</span></p>
                <p><strong>Vocabulary:</strong> <span className="grade">{vocabulary}</span></p>
                <p><strong>Grammar:</strong> <span className="grade">{grammar}</span></p>
                <p><strong>Overall Score:</strong> <span className="grade overall">{overall}</span></p>
            </div>
            <p className="feedback-message">{message}</p> {/* Ensuring message is displayed */}

            <div className="question-answer-section">
                <h3>Essay Question:</h3>
                <p className="question">{question}</p>

                <h3>Your Answer:</h3>
                <p className="answer">{essay}</p>
            </div>

            <button onClick={() => navigate("/")}>Return to Start Page</button>

            <div className="disclaimer">
                <p><strong>Disclaimer:</strong> The results provided are AI-generated and may not fully represent a human assessment. Use them as a guide for improvement.</p>
            </div>

            <button onClick={() => navigate('/')}>Go to Home Page</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Result;
