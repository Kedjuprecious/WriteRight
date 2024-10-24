import React from "react";

const Question = ({ question }) => {
    return (
        <div className="questions">
            {/* <h2>Essay Question:</h2> */}
            <p>{question}</p>
        </div>
    );
};

export default Question;
