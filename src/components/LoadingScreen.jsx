import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaBrain } from "react-icons/fa";

const LoadingScreen = ({ quote }) => {
  const loadingScreenVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.96,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const quoteVariants = {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(6px)",
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <Motion.div
      variants={loadingScreenVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full flex flex-col items-center justify-center min-h-[500px] text-center overflow-hidden"
    >
      {/* Background particle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030014] via-[#0a0020] to-[#00131d] opacity-90"></div>
      <div className="absolute w-[900px] h-[900px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* Subtle floating rings */}
      <Motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] rounded-full border-4 border-fuchsia-500/30 blur-[1px]"
      />
      <Motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] rounded-full border-4 border-cyan-400/30 blur-[2px]"
      />

      {/* Glowing Brain Orb */}
      <div className="relative z-10 flex flex-col items-center">
        <Motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-fuchsia-600 via-cyan-400 to-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.8)] flex items-center justify-center"
          style={{
            boxShadow:
              "0 0 60px rgba(139,92,246,0.6), inset 0 0 40px rgba(6,182,212,0.3)",
          }}
        >
          <FaBrain className="text-white text-5xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse-slow" />
          {/* Glowing pulse ring */}
          <div className="absolute w-32 h-32 rounded-full border-4 border-cyan-300/30 animate-ping"></div>
        </Motion.div>

        {/* App Name */}
        <h2 className="mt-8 text-4xl sm:text-5xl font-extrabold tracking-widest flex items-center justify-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-blue-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-gradient-x">
            BRAINWAVE
          </span>
        </h2>

        {/* Loading Text */}
        <p className="mt-5 text-lg sm:text-xl font-medium text-gray-300 tracking-wide animate-pulse">
          Generating your custom quiz...
        </p>

        {/* Animated Quote */}
        <AnimatePresence mode="wait">
          <Motion.p
            key={quote}
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mt-8 italic text-gray-400 text-base sm:text-lg max-w-sm leading-relaxed"
          >
            “{quote}”
          </Motion.p>
        </AnimatePresence>
      </div>

      {/* Floating particle shimmer layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <Motion.span
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/70 rounded-full"
            animate={{
              y: ["100%", "-20%"],
              x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
              filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))",
            }}
          />
        ))}
      </div>
    </Motion.div>
  );
};

export default LoadingScreen;
