import { motion as Motion } from "framer-motion";
import {
  FaBook,
  FaPuzzlePiece,
  FaPlay,
  FaExclamationTriangle,
  FaRobot,
} from "react-icons/fa";

const TopicInputScreen = ({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  startQuiz,
  error,
}) => {
  const difficulties = ["Easy", "Medium", "Hard"];

  // Animation variants
  const screenVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeIn" } },
  };

  const cardItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <Motion.div
      variants={screenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-10 lg:p-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800"
    >
      {/* ===== Left Section: AI Model Visual ===== */}
      <Motion.div
        variants={cardItemVariants}
        className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center justify-center mb-10 md:mb-0 md:mr-12"
      >
        <div
          className="relative w-full max-w-sm h-64 md:h-96 bg-gradient-to-br from-fuchsia-700 via-purple-700 to-violet-700 rounded-3xl shadow-[0_0_60px_-10px_rgba(217,70,239,0.5)] flex items-center justify-center overflow-hidden ring-2 ring-fuchsia-400/20"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1000px) rotateY(10deg) rotateX(5deg)",
          }}
        >
          <FaRobot className="text-fuchsia-200 text-8xl absolute z-10 animate-pulse-slow drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-3xl"></div>
          <div className="absolute w-2/3 h-2/3 bg-fuchsia-400/30 rounded-full blur-3xl animate-blob"></div>
          <p className="absolute bottom-6 text-fuchsia-100 font-semibold text-lg tracking-wide">
            Interactive 3D Visual
          </p>
        </div>

        <h3 className="text-3xl font-black mt-6 text-white tracking-tight">
          <span className="text-cyan-400">BRAIN</span>
          <span className="text-fuchsia-400">WAVE</span> <span>AI</span>
        </h3>
        <p className="text-gray-400 text-lg mt-2 text-center max-w-xs">
          Create personalized quizzes powered by intelligent AI algorithms.
        </p>
      </Motion.div>

      {/* ===== Right Section: Input Card ===== */}
      <Motion.div
        variants={cardItemVariants}
        className="w-full md:w-3/5 lg:w-2/3 max-w-2xl bg-gray-900/50 border border-gray-700/50 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl p-10 ring-1 ring-cyan-400/20"
        style={{
          boxShadow:
            "0 0 60px -15px rgba(56,189,248,0.3), inset 0 0 10px rgba(255,255,255,0.05)",
        }}
      >
        <Motion.h2
          variants={cardItemVariants}
          className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
        >
          Generate Your Quiz
        </Motion.h2>

        {/* === Topic Input === */}
        <Motion.div variants={cardItemVariants} className="w-full mb-6">
          <label htmlFor="topic-input" className="sr-only">
            Quiz Topic
          </label>
          <div className="relative">
            <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-fuchsia-400 text-xl" />
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Quantum Physics, Renaissance Art, Python"
              className="w-full p-4 pl-12 bg-gray-950/70 border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all duration-300 text-lg"
            />
          </div>
        </Motion.div>

        {/* === Difficulty Buttons === */}
        <Motion.div variants={cardItemVariants} className="w-full mb-8">
          <h3 className="text-lg font-medium text-gray-300 mb-4 text-left">
            Select Difficulty
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {difficulties.map((level) => (
              <Motion.button
                key={level}
                onClick={() => setDifficulty(level)}
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 0 20px rgba(139,92,246,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                  difficulty === level
                    ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-xl shadow-fuchsia-600/50 ring-2 ring-fuchsia-400"
                    : "bg-gray-800/70 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
                }`}
              >
                <FaPuzzlePiece className="mr-2 text-sm" /> {level}
              </Motion.button>
            ))}
          </div>
        </Motion.div>

        {/* === Error Message === */}
        {error && (
          <Motion.div
            variants={cardItemVariants}
            className="flex items-center text-red-400 mb-6 p-3 bg-red-900/30 border border-red-700/70 rounded-xl"
          >
            <FaExclamationTriangle className="mr-2" />
            <p className="text-sm italic">{error}</p>
          </Motion.div>
        )}

        {/* === Start Button === */}
        <Motion.button
          variants={cardItemVariants}
          onClick={startQuiz}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(34,211,238,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-gray-950 text-xl font-semibold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/40 flex items-center justify-center"
        >
          <FaPlay className="mr-3" /> Start Quiz
        </Motion.button>
      </Motion.div>
    </Motion.div>
  );
};

export default TopicInputScreen;
