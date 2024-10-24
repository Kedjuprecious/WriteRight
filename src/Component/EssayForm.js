import React, { useState } from "react";

const EssayForm = ({ onSubmit, isSubmitted }) => {
    const [essayText, setEssayText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(essayText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                disabled={isSubmitted} // Disable text field after submission
                placeholder="Write your essay here..."
            ></textarea>
            <button type="submit" disabled={isSubmitted}>Submit</button>
        </form>
    );
};

export default EssayForm;
