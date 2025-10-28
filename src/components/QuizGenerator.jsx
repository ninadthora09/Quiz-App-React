import { useState, useCallback, useEffect } from "react";
import { fetchQuizQuestions } from "../api/quizApi"; // Make sure this path is correct

import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import TopicInputScreen from "./TopicInputScreen";
import QuizContainer from "./QuizContainer";
import ResultScreen from "./ResultScreen";

import { motion as Motion, AnimatePresence } from "framer-motion";

// Inspirational quotes for the loading screen
const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Don’t watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "Push yourself, because no one else is going to do it for you.",
    "Small steps every day lead to big results.",
    "The mind is not a vessel to be filled, but a fire to be kindled.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Develop a passion for learning. If you do, you will never cease to grow.",
    "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    "The beautiful thing about learning is that no one can take it away from you."
];

const QuizGenerator = () => {
    // State Management
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questionTimes, setQuestionTimes] = useState([]); // Time left for each question
    const [lockedQuestions, setLockedQuestions] = useState([]); // Whether a question is answered/locked
    const [isTimerStopped, setIsTimerStopped] = useState(false); // Controls the active question's timer
    const [quote, setQuote] = useState(""); // For loading screen quotes
    const [showExplanation, setShowExplanation] = useState(false); // To toggle explanation visibility
    const [transitionDirection, setTransitionDirection] = useState(1); // For question card animations

    // Effect to cycle quotes on the loading screen
    useEffect(() => {
        if (!loading) return; // Only run when loading
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]); // Set initial quote
        const interval = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 5000); // Change quote every 5 seconds
        return () => clearInterval(interval); // Cleanup interval
    }, [loading]);

    // Function to start the quiz
    const startQuiz = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic to start the quiz!");
            return;
        }

        setLoading(true);
        setError(null);
        setScore(0);
        setCurrentIndex(0);
        setShowResult(false);
        setSelectedAnswers([]);
        setQuestionTimes([]); // Reset times for new quiz
        setLockedQuestions([]); // Reset lock status
        setIsTimerStopped(false);
        setShowExplanation(false);
        setTransitionDirection(1); // Reset direction for first question

        try {
            const data = await fetchQuizQuestions(topic, difficulty); // API call

            if (!Array.isArray(data) || data.length === 0) {
                setError("No questions could be generated for that topic. Please try another!");
                setQuestions([]); // Ensure questions array is empty if no data
            } else {
                // Format questions to include 'answer' letter (A, B, C, D)
                const formatted = data.map((q) => {
                    const answerIndex = q.options.indexOf(q.correctAnswer);
                    return { ...q, answer: ["A", "B", "C", "D"][answerIndex] || "A" };
                });
                setQuestions(formatted);
                // Initialize each question with a 60-second timer and unlocked status
                setQuestionTimes(new Array(formatted.length).fill(60));
                setLockedQuestions(new Array(formatted.length).fill(false));
            }
        } catch (err) {
            console.error("Failed to fetch questions:", err);
            setError("Failed to fetch questions. Please check your network or try again.");
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Handler for when an option is selected
    const handleSelect = useCallback((letter) => {
        // Prevent selecting if already answered or locked
        if (selectedAnswers[currentIndex] !== undefined || lockedQuestions[currentIndex]) {
            return;
        }

        const newSelected = [...selectedAnswers];
        newSelected[currentIndex] = letter; // Store selected answer
        setSelectedAnswers(newSelected);

        const newLocked = [...lockedQuestions];
        newLocked[currentIndex] = true; // Lock the current question
        setLockedQuestions(newLocked);

        setIsTimerStopped(true); // Stop the timer for the current question

        // Update score if correct
        if (letter === questions[currentIndex].answer) {
            setScore((prev) => prev + 1);
        }

        setShowExplanation(true); // Show explanation after selection
    }, [currentIndex, selectedAnswers, lockedQuestions, questions]);

    // Handler for when the timer runs out for a question
    const handleTimeUp = useCallback(() => {
        // Only lock if not already answered
        if (!lockedQuestions[currentIndex]) {
            const newLocked = [...lockedQuestions];
            newLocked[currentIndex] = true;
            setLockedQuestions(newLocked);

            // Mark as unanswered if no selection was made
            const newSelected = [...selectedAnswers];
            if (!newSelected[currentIndex]) {
                newSelected[currentIndex] = null; // Use null to indicate unanswered, but locked
            }
            setSelectedAnswers(newSelected);
        }

        setIsTimerStopped(true); // Ensure timer is stopped
        setShowExplanation(true); // Show explanation automatically
    }, [currentIndex, lockedQuestions, selectedAnswers]);

    // Callback to update the time left for the current question
    const handleTick = useCallback(
        (timeLeft) => {
            const newTimes = [...questionTimes];
            newTimes[currentIndex] = timeLeft;
            setQuestionTimes(newTimes);
        },
        [currentIndex, questionTimes]
    );

    // Function to move to the next question or show results
    const nextQuestion = () => {
        setTransitionDirection(1); // Set direction for forward animation
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsTimerStopped(false); // Start timer for the new question
            setShowExplanation(false); // Hide explanation for the new question
        } else {
            setShowResult(true); // All questions answered, show results
        }
    };

    // Function to move to the previous question
    const prevQuestion = () => {
        if (currentIndex === 0) return; // Cannot go before the first question
        setTransitionDirection(-1); // Set direction for backward animation
        setCurrentIndex((prev) => prev - 1);
        // When going back, we typically want the timer stopped and explanation visible for review
        setIsTimerStopped(true);
        setShowExplanation(true);
    };

    // Function to reset the quiz to its initial state
    const resetQuiz = () => {
        setTopic("");
        setDifficulty("Medium");
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswers([]);
        setQuestionTimes([]);
        setLockedQuestions([]);
        setIsTimerStopped(false);
        setError(null);
        setShowExplanation(false);
        setTransitionDirection(1); // Reset direction
    };

    return (
        <div className="quiz-generator relative w-screen min-h-screen flex flex-col items-center bg-gray-950 font-sans overflow-hidden">
            {/* Background Layer: Deep Dark + Neon Blobs */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900 z-0 opacity-90"></div>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-[200px] opacity-10 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-lighten filter blur-[200px] opacity-10 animate-blob animation-delay-3000"></div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 flex justify-center items-center flex-grow py-10">
                <AnimatePresence mode="wait" initial={false}>
                    {/* Loading Screen */}
                    {loading && (
                        <LoadingScreen key="loading" quote={quote} />
                    )}

                    {/* Topic Input Screen */}
                    {!loading && !showResult && questions.length === 0 && (
                        <TopicInputScreen
                            key="input"
                            topic={topic}
                            setTopic={setTopic}
                            difficulty={difficulty}
                            setDifficulty={setDifficulty}
                            startQuiz={startQuiz}
                            error={error}
                        />
                    )}

                    {/* Quiz Questions Screen */}
                    {!loading && questions.length > 0 && !showResult && (
                        <QuizContainer
                            key={`quiz-${currentIndex}`} // Key change triggers AnimatePresence for QuizCard
                            question={questions[currentIndex]}
                            topic={topic}
                            difficulty={difficulty}
                            selectedLetter={selectedAnswers[currentIndex] || null}
                            onSelect={handleSelect}
                            nextQuestion={nextQuestion}
                            prevQuestion={prevQuestion}
                            currentIndex={currentIndex}
                            totalQuestions={questions.length}
                            locked={lockedQuestions[currentIndex] || selectedAnswers[currentIndex] !== undefined}
                            initialTime={questionTimes[currentIndex]}
                            onTimeUp={handleTimeUp}
                            isTimerStopped={isTimerStopped || lockedQuestions[currentIndex]}
                            onTick={handleTick}
                            showExplanation={showExplanation}
                            transitionDirection={transitionDirection} // Pass direction for QuizCard animation
                        />
                    )}

                    {/* Result Screen */}
                    {showResult && (
                        <ResultScreen
                            key="result"
                            score={score}
                            total={questions.length}
                            topic={topic}
                            difficulty={difficulty}
                            resetQuiz={resetQuiz}
                        />
                    )}
                </AnimatePresence>
            </div>
            {/* Added a footer/spacer to push content up slightly from bottom if needed */}
            <div className="h-10 sm:h-20 flex-shrink-0"></div>
        </div>
    );
};

export default QuizGenerator;