import { motion as Motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
    // If total is 0 or less, ensure progress is 0% to avoid NaN
    const progress = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden mb-6">
            <Motion.div
                initial={{ width: '0%' }}
                // Animate to the calculated progress, ensure it's not NaN
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(52,211,255,0.8)]"
            />
        </div>
    );
};
export default ProgressBar;