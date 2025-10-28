import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion"; // Make sure AnimatePresence is imported!
import OptionButton from "./OptionButton"; // Import the OptionButton component

// Framer Motion Variants for Question Fade/Slide
const questionVariants = {
    // 'direction' will be 1 for next, -1 for previous
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 50 : -50, // Enter from right if direction is positive (next), from left if negative (prev)
        scale: 0.95,
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 }
        }
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction < 0 ? 50 : -50, // Exit to right if direction is negative (prev), to left if positive (next)
        scale: 0.95,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 }
        }
    })
};

const QuizCard = ({
    question,
    selectedLetter,
    onSelect,
    locked,
    showExplanation,
    transitionDirection // Now correctly received from QuizContainer
}) => {
    if (!question) {
        return (
            <div className="text-xl text-gray-400 p-8 text-center">
                No question available. Please check quiz generation.
            </div>
        );
    }

    return (
        // AnimatePresence for the question content itself when `key` changes
        <AnimatePresence mode="wait" custom={transitionDirection}>
            <Motion.div
                // Use a unique key for each question to trigger exit/enter animations
                key={question.question} // Or question.id if available
                custom={transitionDirection} // Pass custom prop for variants
                variants={questionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex flex-col"
            >
                {/* Question Text */}
                <div className="mb-8 p-6 bg-gray-900/50 rounded-3xl border border-gray-700/50 shadow-md">
                    <p className="text-3xl font-extrabold text-white leading-relaxed">
                        {question.question}
                    </p>
                </div>

                {/* Options Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    {question.options.map((option, index) => {
                        const letter = ["A", "B", "C", "D"][index];
                        const isCorrect = letter === question.answer; // Assuming 'question.answer' is 'A', 'B', 'C', or 'D'

                        return (
                            <OptionButton
                                key={letter}
                                letter={letter}
                                option={option}
                                onClick={() => onSelect(letter)}
                                isSelected={selectedLetter === letter}
                                isCorrect={isCorrect}
                                isLocked={locked} // Pass the locked state
                                showFeedback={locked} // Show feedback only when locked
                            />
                        );
                    })}
                </div>

                {/* Explanation Area (Conditional) */}
                {showExplanation && question.explanation && (
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 p-6 bg-gray-900/50 rounded-3xl border border-l-4 border-cyan-400 shadow-md"
                    >
                        <h4 className="text-xl font-bold text-cyan-400 mb-2">Explanation</h4>
                        <p className="text-gray-300">
                            {question.explanation}
                        </p>
                    </Motion.div>
                )}
            </Motion.div>
        </AnimatePresence>
    );
};

export default QuizCard;