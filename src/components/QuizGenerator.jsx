import { useState, useCallback, useEffect } from "react";
import { fetchQuizQuestions } from "../api/quizApi"; // Make sure this path is correct

import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import TopicInputScreen from "./TopicInputScreen";
import QuizContainer from "./QuizContainer";
import ResultScreen from "./ResultScreen";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Login from "./Login";
import Logout from "./Logout";

import { motion as Motion, AnimatePresence } from "framer-motion";

// Inspirational quotes for the loading screen
const quotes = [
  "Success is not final, and failure is not the end — both are merely parts of your journey; what truly defines you is the courage, resilience, and determination to rise and move forward every single time life tests your strength.",
  "Don’t waste your energy staring at the clock, waiting for the perfect time — instead, keep working relentlessly, because progress is made by those who move steadily, not those who wait for ideal moments.",
  "The secret of getting ahead in life lies in that very first step you take when no one is watching, that tiny moment of action that turns your dreams into motion and your ideas into achievements.",
  "Push yourself beyond the limits of comfort, because no one else will fight your battles for you; the drive to succeed must come from the fire that burns within your own soul.",
  "Small, consistent steps taken with focus and discipline every single day will eventually lead you to extraordinary results that once seemed impossible to reach.",
  "The mind is not a vessel to be filled with random facts, but a living flame to be kindled with curiosity, imagination, and the constant desire to seek truth and understanding.",
  "Education is not just about grades or degrees; it is the most powerful weapon that shapes your thinking, transforms your world, and gives you the courage to challenge the impossible.",
  "Develop a passion for learning so deep that you lose track of time; when knowledge excites your heart, you’ll find yourself growing even when you least expect it.",
  "Learning does not happen by accident — it requires effort, focus, and an unshakable will to grow, even when the journey feels long and uncertain.",
  "The most beautiful thing about learning is that it belongs entirely to you — no force, no failure, and no circumstance can ever take away what you have truly understood.",
  "Every challenge you face in your studies is not a wall, but a doorway; if you push through it with patience and persistence, you’ll find new worlds of wisdom waiting on the other side.",
  "Don’t compare your progress to anyone else’s; every learner walks a different path, and the speed of your journey matters far less than the direction you choose to take.",
  "The habits you build today — even the smallest ones — will silently shape the person you become tomorrow, so make every effort count toward your best self.",
  "A mind that never stops questioning will never stop growing; curiosity is the heartbeat of knowledge, the spark that turns ordinary thinkers into innovators.",
  "Greatness is not achieved overnight; it is the quiet accumulation of thousands of small efforts that no one sees but that slowly build the foundation of success.",
  "Failure should never discourage you; it is proof that you are trying, learning, and evolving into someone far more capable than before.",
  "Discipline will take you further than motivation ever can — because motivation fades, but discipline builds habits that carry you through even your weakest days.",
  "The more you learn, the more powerful you become — not in controlling others, but in mastering yourself, your choices, and your destiny.",
  "Knowledge is the light that reveals opportunity in the darkest times; it turns confusion into clarity and uncertainty into purpose.",
  "Don’t just aim to succeed; aim to grow, to understand, and to leave behind a legacy of wisdom that inspires others long after you’ve moved on."
];

const QuizGenerator = () => {
  // Firebase Auth
  const [user, loadingAuth] = useAuthState(auth);

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

  // ✅ Always run this effect — not conditionally
  useEffect(() => {
    if (!loading) return; // Only run when loading is true
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    return () => clearInterval(interval);
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
      const data = await fetchQuizQuestions(topic, difficulty);

      if (!Array.isArray(data) || data.length === 0) {
        setError("No questions could be generated for that topic. Please try another!");
        setQuestions([]);
      } else {
        const formatted = data.map((q) => {
          const answerIndex = q.options.indexOf(q.correctAnswer);
          return { ...q, answer: ["A", "B", "C", "D"][answerIndex] || "A" };
        });
        setQuestions(formatted);
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

  // Handler when an option is selected
  const handleSelect = useCallback(
    (letter) => {
      if (selectedAnswers[currentIndex] !== undefined || lockedQuestions[currentIndex]) return;

      const newSelected = [...selectedAnswers];
      newSelected[currentIndex] = letter;
      setSelectedAnswers(newSelected);

      const newLocked = [...lockedQuestions];
      newLocked[currentIndex] = true;
      setLockedQuestions(newLocked);

      setIsTimerStopped(true);

      if (letter === questions[currentIndex].answer) {
        setScore((prev) => prev + 1);
      }

      setShowExplanation(true);
    },
    [currentIndex, selectedAnswers, lockedQuestions, questions]
  );

  // Handler for when time runs out
  const handleTimeUp = useCallback(() => {
    if (!lockedQuestions[currentIndex]) {
      const newLocked = [...lockedQuestions];
      newLocked[currentIndex] = true;
      setLockedQuestions(newLocked);

      const newSelected = [...selectedAnswers];
      if (!newSelected[currentIndex]) {
        newSelected[currentIndex] = null;
      }
      setSelectedAnswers(newSelected);
    }

    setIsTimerStopped(true);
    setShowExplanation(true);
  }, [currentIndex, lockedQuestions, selectedAnswers]);

  // Update timer for current question
  const handleTick = useCallback(
    (timeLeft) => {
      const newTimes = [...questionTimes];
      newTimes[currentIndex] = timeLeft;
      setQuestionTimes(newTimes);
    },
    [currentIndex, questionTimes]
  );

  const nextQuestion = () => {
    setTransitionDirection(1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsTimerStopped(false);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex === 0) return;
    setTransitionDirection(-1);
    setCurrentIndex((prev) => prev - 1);
    setIsTimerStopped(true);
    setShowExplanation(true);
  };

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
    setTransitionDirection(1);
  };

  // ✅ Handle auth loading first
  if (loadingAuth) {
    return <LoadingScreen quote="Authenticating user..." />;
  }

  // ✅ If user is not logged in
  if (!user) {
    return <Login/>;
  }

  return (
    <div className="quiz-generator relative w-screen min-h-screen flex flex-col items-center bg-gray-950 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900 z-0 opacity-90"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-[200px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-lighten filter blur-[200px] opacity-10 animate-blob animation-delay-3000"></div>

      {/* Navbar */}
      <Navbar />
      <Logout />

      {/* Main Area */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 flex justify-center items-center flex-grow py-10">
        <AnimatePresence mode="wait" initial={false}>
          {loading && <LoadingScreen key="loading" quote={quote} />}

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

          {!loading && questions.length > 0 && !showResult && (
            <QuizContainer
              key={`quiz-${currentIndex}`}
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
              transitionDirection={transitionDirection}
            />
          )}

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
        <Logout />
      <div className="h-10 sm:h-20 flex-shrink-0"></div>
    </div>
  );
};

export default QuizGenerator;
