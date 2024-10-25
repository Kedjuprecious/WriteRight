import React, { useEffect, useState } from 'react';

const Timer = ({ onTimeUp, examStartTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(() => {
        const savedTime = localStorage.getItem('timeRemaining');
        return savedTime ? JSON.parse(savedTime) : 5400; 
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    localStorage.removeItem('timeRemaining');
                    onTimeUp();
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem('timeRemaining', JSON.stringify(newTime));
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="timer-container">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            <span id="countdown">{formatTime(timeRemaining)}</span>
        </div>
    );
};

export default Timer;
