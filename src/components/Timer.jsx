import { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';

const Timer = ({ initialTime, onTimeUp, isStopped, onTick, className }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const timerIdRef = useRef(null); // Use ref to hold timer ID

    // Reset timer when initialTime prop changes (e.g., new question)
    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (isStopped) {
            clearInterval(timerIdRef.current); // Stop the timer if isStopped is true
            return;
        }

        // Clear any existing timer before starting a new one
        clearInterval(timerIdRef.current);

        if (timeLeft <= 0) {
            // Ensure onTimeUp is a function before calling
            if (typeof onTimeUp === 'function') {
                onTimeUp();
            }
            return;
        }

        timerIdRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                // Call onTick if it's a function
                if (typeof onTick === 'function') {
                    onTick(newTime);
                }
                if (newTime <= 0) {
                    clearInterval(timerIdRef.current);
                    if (typeof onTimeUp === 'function') {
                        onTimeUp();
                    }
                    return 0; // Ensure time doesn't go negative
                }
                return newTime;
            });
        }, 1000);

        // Cleanup function: clear interval when component unmounts or dependencies change
        return () => clearInterval(timerIdRef.current);
    }, [timeLeft, isStopped, onTimeUp, onTick]); // Dependencies for useEffect

    // Calculate minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Determine color based on time left
    const timerColorClass = timeLeft <= 10 ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "text-cyan-400 drop-shadow-[0_0_5px_rgba(52,211,255,0.8)]";

    return (
        <Motion.div
            key={timeLeft} // Key change will trigger a subtle animation on time update
            initial={{ opacity: 0.8, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`font-mono text-xl sm:text-2xl font-bold p-2 px-4 rounded-lg bg-gray-900/50 border border-gray-700/50 ${timerColorClass} ${className}`}
        >
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </Motion.div>
    );
};

export default Timer;