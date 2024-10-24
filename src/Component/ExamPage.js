import React, { useState, useEffect } from "react";
import EssayForm from "./EssayForm";
import Question from "./Question";
import Result from "./Result";
import Timer from './Timer'; 
import axios from 'axios';

const ExamPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [grade, setGrade] = useState(null);
    const [essay, setEssay] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [timeUp, setTimeUp] = useState(false); // To handle time up

    const maxWords = 500;
    const minWords = 150;

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/questions", {
                    withCredentials: true,
                });
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    
    // Word counter handler
    const handleEssayChange = (e) => {
        const inputText = e.target.value;
        const wordArray = inputText.trim().split(/\s+/);
        const wordsUsed = wordArray.filter((word) => word).length; // Filter out empty spaces

        if (wordsUsed <= maxWords) {
            setEssay(inputText);
            setWordCount(wordsUsed);
        }
    };

    // Handle essay submission directly to Gradio model
    // Handle essay submission directly to Gradio model
const handleSubmission = async (e) => {
    if (e) e.preventDefault(); // Check if e exists before calling preventDefault

    if (wordCount >= minWords) {
        try {
            const gradioUrl = 'https://5be2924f5470141f7e.gradio.live'; 
            const response = await axios.post(gradioUrl, { data: [essay] });
            
            const receivedGrade = response.data?.data?.[0];
            setGrade(receivedGrade);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error grading essay:', error);
            alert("There was an error grading your essay. Please try again.");
        }
    } else {
        alert("Please write at least 150 words.");
    }
};


    // Timer's onTimeUp handler
    const handleTimeUp = () => {
        setTimeUp(true);
        handleSubmission(); // Automatically submit the essay when time is up
    };

    return (
        <div className="exam-page">
            {!isSubmitted && !timeUp && (
                <>
                    {/* Timer Component */}
                    <Timer onTimeUp={handleTimeUp} />

                    {/* Display question */}
                    <div className="question-field">
                        <div>{questions[currentQuestionIndex]}</div>
                    </div>

                    {/* Essay input form */}
                    <form onSubmit={handleSubmission}>
                        <div className="essay-form">
                            <textarea
                                value={essay}
                                onChange={handleEssayChange}
                                placeholder="Type your essay here..."
                            />
                            <div className="word-counter">
                                <span style={{ color: wordCount < minWords ? 'red' : 'black' }}>
                                    {wordCount}/{maxWords}
                                </span>
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </>
            )}

            {/* Result section displayed when submitted */}
            {isSubmitted && (
                <div className="result-section">
                    <h2>Essay Graded</h2>
                    <p>Your grade: {grade}</p>
                </div>
            )}

            {/* Display when time is up
            {timeUp && !isSubmitted && (
                <div className="result-section">
                    <h2>Time is up!</h2>
                    <p>Your essay has been submitted automatically.</p>
                </div>
            )} */}

            {questions.length > 0 && !isSubmitted && (
                <>
                    <Question question={questions[currentQuestionIndex]} />
                    <EssayForm onSubmit={handleSubmission} />
                </>
            )}
            {isSubmitted && <Result grade={grade} question={questions[currentQuestionIndex]} essay={essay} />}

        </div>
    );
};

export default ExamPage;