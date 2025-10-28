import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaBrain } from "react-icons/fa"; // Using FaBrain for the logo on the loading screen

const LoadingScreen = ({ quote }) => {
    // Variants for the loading screen container
    // We'll keep a subtle animation for the whole content block
    const loadingScreenVariants = {
        initial: { opacity: 0, y: 50, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.4, ease: "easeIn" } }
    };

    // Variants for the quote text
    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
    };

    return (
        <Motion.div
            variants={loadingScreenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Removed card-specific styles (bg, border, shadow, backdrop-blur, ring)
            // Centering items and ensuring appropriate spacing
            className="text-center p-8 sm:p-12 w-full max-w-md flex flex-col items-center justify-center min-h-[400px]"
            // Removed inline boxShadow style
        >
            {/* Spinning Loader */}
            <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-8 border-cyan-400 border-t-transparent rounded-full mb-8 shadow-lg drop-shadow-[0_0_10px_rgba(52,211,255,0.8)]"
            />

            {/* App Logo/Title */}
            <h2 className="text-4xl font-extrabold text-white mb-6 flex items-center">
                <FaBrain className="text-fuchsia-400 mr-3 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(52,211,255,0.8)]">BRAIN</span>
                <span className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.8)]">WAVE</span>
            </h2>

            {/* Generating Message */}
            <p className="text-2xl font-semibold text-white mb-6">
                Generating Your Custom Quiz...
            </p>

            {/* Animated Quote */}
            <AnimatePresence mode="wait">
                <Motion.p
                    key={quote} // Change key to trigger re-animation for each new quote
                    variants={quoteVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="italic text-lg text-gray-300 leading-relaxed max-w-xs"
                >
                    "{quote}"
                </Motion.p>
            </AnimatePresence>
        </Motion.div>
    );
};

export default LoadingScreen;