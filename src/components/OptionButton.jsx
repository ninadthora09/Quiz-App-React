// OptionButton.jsx
import { motion as Motion } from "framer-motion";

const OptionButton = ({ letter, option, onClick, isSelected, isCorrect, isLocked, showFeedback }) => {

    let bgColor = "bg-gray-700/50";
    let textColor = "text-white";
    let ringColor = "ring-gray-600";

    if (showFeedback && isSelected && isCorrect) {
        // Correctly selected
        bgColor = "bg-green-500/80";
        textColor = "text-gray-950";
        ringColor = "ring-green-400";
    } else if (showFeedback && isSelected && !isCorrect) {
        // Incorrectly selected
        bgColor = "bg-fuchsia-500/80";
        textColor = "text-gray-950";
        ringColor = "ring-fuchsia-400";
    } else if (showFeedback && isCorrect && !isSelected) {
        // Correct answer highlight
        bgColor = "bg-cyan-500/50";
        textColor = "text-white";
        ringColor = "ring-cyan-400";
    } else if (isSelected && !isLocked) {
        // Currently selected (pre-lock)
        bgColor = "bg-cyan-500/30";
        textColor = "text-cyan-200";
        ringColor = "ring-cyan-400";
    }

    const whileHover = isLocked ? {} : { scale: 1.03, boxShadow: '0 0 15px rgba(52, 211, 255, 0.5)' };
    const whileTap = isLocked ? {} : { scale: 0.98 };
    const shake = !isCorrect && isSelected && showFeedback ? { x: [0, -10, 10, -5, 5, 0] } : {};
    const ringPulse = isSelected ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } } : {};

    return (
        <Motion.button
            onClick={onClick}
            disabled={isLocked}
            whileHover={whileHover}
            whileTap={whileTap}
            animate={{ ...shake, ...ringPulse }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`p-5 rounded-2xl text-left transition-all duration-300 border-2 ${isLocked ? '' : 'hover:border-cyan-400/50'}
                ${bgColor} ${textColor} border-transparent ring-2 ${ringColor} ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
        >
            <div className="flex items-start">
                <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full mr-4 text-lg flex-shrink-0 transition-colors
                    ${showFeedback && isSelected
                        ? (isCorrect ? 'bg-gray-950 text-green-400' : 'bg-gray-950 text-fuchsia-400')
                        : 'bg-gray-950/70 text-cyan-400'
                    }`}
                >
                    {letter}
                </div>
                <p className="text-xl font-medium pt-0.5">{option}</p>
            </div>
        </Motion.button>
    );
};

export default OptionButton;