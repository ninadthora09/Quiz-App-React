import { motion as Motion } from "framer-motion";
import { FaSyncAlt, FaMedal, FaChartBar, FaBookOpen } from "react-icons/fa";
import Confetti from 'react-confetti'; // Make sure to install: npm install react-confetti
import Lottie from 'lottie-react'; // Make sure to install: npm install lottie-react

// You'll need to import your Lottie animation JSON file
// Example: import celebrationAnimation from '../assets/celebration.json';
// For now, I'll use a placeholder.
const celebrationAnimation = null; // Replace with your actual Lottie JSON import

const ScoreCircle = ({ percentage }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor = percentage >= 80 ? "stroke-cyan-400" : percentage >= 50 ? "stroke-fuchsia-400" : "stroke-red-400";
    const textColor = percentage >= 80 ? "text-cyan-400" : percentage >= 50 ? "text-fuchsia-400" : "text-red-400";

    return (
        <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <Motion.circle
                    className={`${strokeColor} transition-colors duration-500 ease-in-out`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference} // Initial value
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${textColor}`}>
                <Motion.span
                    className="text-4xl font-extrabold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    {percentage}%
                </Motion.span>
            </div>
        </div>
    );
};

const ResultScreen = ({ score, total, topic, difficulty, resetQuiz }) => {
    const percentage = Math.round((score / total) * 100);

    const getResultEmoji = () => {
        if (percentage >= 90) return "🌟";
        if (percentage >= 70) return "🎉";
        if (percentage >= 50) return "👍";
        return "📚";
    };

    const getResultText = () => {
        if (percentage >= 90) return "Outstanding Performance!";
        if (percentage >= 70) return "Great Job!";
        if (percentage >= 50) return "Good Effort!";
        return "Keep Learning!";
    };

    // Variants for the result screen container
    const resultScreenVariants = {
        initial: { opacity: 0, scale: 0.8, rotateX: 15 },
        animate: { opacity: 1, scale: 1, rotateX: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
        exit: { opacity: 0, scale: 0.8, rotateX: -15, transition: { duration: 0.3, ease: "easeIn" } }
    };

    return (
        <>
            {/* Confetti effect for good scores */}
            {percentage >= 70 && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false} // Confetti falls once
                    numberOfPieces={percentage >= 90 ? 800 : 400} // More confetti for higher scores
                    tweenDuration={1000}
                    confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }} // Starts from the top
                />
            )}

            <Motion.div
                variants={resultScreenVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-center p-8 sm:p-12 bg-gray-800/20 border border-gray-700/40 rounded-[3rem] shadow-2xl backdrop-blur-xl w-full max-w-lg ring-4 ring-cyan-400/10 flex flex-col items-center justify-center"
                style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' // Glassmorphism shadow
                }}
            >
                <Motion.div
                    className="text-7xl mb-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                >
                    {getResultEmoji()}
                </Motion.div>

                <h2 className="text-4xl font-extrabold text-white mb-3">
                    {getResultText()}
                </h2>
                <p className="text-xl font-medium text-gray-300 mb-8">
                    You scored <span className="text-cyan-400 font-bold">{score}</span> out of <span className="text-fuchsia-400 font-bold">{total}</span> questions.
                </p>

                {/* Score Circle Progress */}
                <ScoreCircle percentage={percentage} />

                {/* Lottie Animation (Conditional) */}
                {celebrationAnimation && percentage >= 70 && (
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="w-40 h-40 mx-auto -mt-4 mb-4" // Adjust margin to position with score circle
                    >
                        <Lottie animationData={celebrationAnimation} loop={false} autoplay={true} />
                    </Motion.div>
                )}
                {!celebrationAnimation && percentage >= 70 && (
                    <p className="text-yellow-400 text-sm italic mb-4">
                        (Lottie animation placeholder - import your JSON!)
                    </p>
                )}


                <div className="mt-6 text-lg font-medium text-gray-400 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <span className="flex items-center">
                        <FaBookOpen className="text-fuchsia-400 mr-2" /> Topic: <span className="text-fuchsia-300 font-bold ml-1">{topic}</span>
                    </span>
                    <span className="flex items-center">
                        <FaChartBar className="text-cyan-400 mr-2" /> Difficulty: <span className="text-cyan-300 font-bold ml-1">{difficulty}</span>
                    </span>
                </div>

                <Motion.button
                    onClick={resetQuiz}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(52, 211, 255, 0.6)' }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-950 text-xl font-semibold px-10 py-4 rounded-2xl transition duration-300 shadow-xl shadow-cyan-500/50 flex items-center justify-center relative overflow-hidden"
                >
                    <FaSyncAlt className="mr-3" /> Start New Quiz
                </Motion.button>
            </Motion.div>
        </>
    );
};

export default ResultScreen;