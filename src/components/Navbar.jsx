// Navbar.jsx
import { motion as Motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

const Navbar = () => {
    return (
        <Motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-20 w-full backdrop-blur-sm bg-gray-900/40 border-b border-gray-700/50 py-4 shadow-xl"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Motion.div
                        className="text-4xl text-cyan-400"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaBrain className="drop-shadow-[0_0_8px_rgba(52,211,255,0.8)]" />
                    </Motion.div>
                    <h1 className="ml-3 text-3xl font-black tracking-widest text-white uppercase">
                        <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(52,211,255,0.8)]">BRAIN</span>
                        <span className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.8)]">WAVE</span>
                    </h1>
                </div>
                <div className="hidden sm:block text-sm text-gray-400">
                    <p>Knowledge Beyond The Horizon</p>
                </div>
            </div>
        </Motion.nav>
    );
};

export default Navbar;