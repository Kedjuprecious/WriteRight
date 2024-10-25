import React, { useState, useEffect } from "react";
import Question from "./Question";
import Result from "./Result";
import Timer from './Timer'; 
import axios from 'axios';
import { auth } from '../firebase';

const ExamPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [grade, setGrade] = useState(null);
    const [essay, setEssay] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    const maxWords = 500;
    const minWords = 150;

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/question");
                setQuestions([response.data]); // Adjusted to set single question
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Handle essay submission to the backend
    const handleSubmission = async (e) => {
        if (e) e.preventDefault();

        if (wordCount >= minWords) {
            try {
                const response = await axios.post("http://localhost:5000/api/submit", { essay });
                const gradingResult = response.data;
                setGrade(gradingResult);
                setIsSubmitted(true);
            } catch (error) {
                console.error('Error grading essay:', error);
                alert("There was an error grading your essay. Please try again.");
            }
        } else {
            alert("Please write at least 150 words.");
        }
    };

    const handleEssayChange = (e) => {
        const inputText = e.target.value;
        const wordsUsed = inputText.trim().split(/\s+/).filter(word => word).length;
        if (wordsUsed <= maxWords) {
            setEssay(inputText);
            setWordCount(wordsUsed);
        }
    };

    const handleTimeUp = () => {
        setTimeUp(true);
        handleSubmission(); // Auto-submit on time up
    };

    const handleStartExam = () => setShowWelcome(false);

    return (
        <div className="exam-page">
            {showWelcome && (
                <div className="welcome-modal">
                    <h2>Welcome, {auth.currentUser?.displayName}!</h2>
                    <button onClick={handleStartExam}>Start Exam</button>
                </div>
            )}
            {!isSubmitted && !timeUp && !showWelcome && (
                <>
                    <Timer onTimeUp={handleTimeUp} />
                    <Question question={questions[currentQuestionIndex]} />
                    <form onSubmit={handleSubmission}>
                        <textarea
                            value={essay}
                            onChange={handleEssayChange}
                            placeholder="Type your essay here..."
                        />
                        {/* Word Count Display */}
                        <div 
                            style={{ 
                                color: wordCount < minWords ? 'red' : 'black' 
                            }}
                        >
                            {wordCount}/{maxWords}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}
            {isSubmitted && <Result grade={grade} question={questions[currentQuestionIndex]} essay={essay} />}
        </div>
    );
};

export default ExamPage;
