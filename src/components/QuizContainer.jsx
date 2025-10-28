// QuizContainer.jsx
import { motion as Motion } from "framer-motion";
import QuizCard from "./QuizCard"; // Replaced old QuizCard
import ProgressBar from "./ProgressBar"; // NEW: Progress bar
import Timer from "./Timer"; // NEW: Timer component
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuizContainer = ({
    question, topic, difficulty, selectedLetter, onSelect, nextQuestion, prevQuestion,
    currentIndex, totalQuestions, locked, initialTime, onTimeUp, isTimerStopped, onTick, showExplanation,
    transitionDirection // ADDED: transitionDirection prop
}) => {

    return (
        <Motion.div
            className="w-full max-w-4xl bg-gray-800/20 border border-gray-700/40 rounded-[3rem] shadow-2xl p-6 sm:p-10 backdrop-blur-xl ring-4 ring-cyan-400/10 flex flex-col h-full"
            style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}
        >
            {/* Header/Info Bar */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center text-gray-300">
                <div className="text-lg font-semibold mb-2 sm:mb-0">
                    Topic: <span className="text-cyan-400">{topic}</span> | Difficulty: <span className="text-fuchsia-400">{difficulty}</span>
                </div>
                {/* Timer */}
                <Timer
                    initialTime={initialTime}
                    onTimeUp={onTimeUp}
                    isStopped={isTimerStopped}
                    onTick={onTick}
                    className="text-2xl font-bold text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]"
                />
            </div>

            {/* Progress Bar */}
            <ProgressBar total={totalQuestions} current={currentIndex + 1} />

            {/* Quiz Card */}
            <div className="my-8 flex-grow flex items-center justify-center">
                <QuizCard
                    question={question}
                    selectedLetter={selectedLetter}
                    onSelect={onSelect}
                    locked={locked}
                    showExplanation={showExplanation}
                    // Pass current index for unique key and transition direction
                    key={currentIndex}
                    transitionDirection={transitionDirection} // ADDED: Pass transitionDirection to QuizCard
                />
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between items-center">
                <Motion.button
                    onClick={prevQuestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={currentIndex === 0 || !locked} // Only allow review if answered
                    className={`flex items-center text-lg font-semibold py-3 px-6 rounded-full transition-all duration-300
                        ${currentIndex > 0 && locked
                            ? "bg-gray-700/50 text-white hover:bg-gray-600/70"
                            : "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    <FaArrowLeft className="mr-2" /> Previous
                </Motion.button>

                <div className="text-xl font-extrabold text-white">
                    {currentIndex + 1} / {totalQuestions}
                </div>

                <Motion.button
                    onClick={nextQuestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!locked}
                    className={`flex items-center text-lg font-semibold py-3 px-6 rounded-full transition-all duration-300
                        ${locked
                            ? "bg-cyan-500 text-gray-950 shadow-lg shadow-cyan-500/50 hover:bg-cyan-400"
                            : "bg-gray-700/30 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'} <FaArrowRight className="ml-2" />
                </Motion.button>
            </div>
        </Motion.div>
    );
};

export default QuizContainer;