// src/components/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { motion as Motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google sign-in successful!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Left side - Image / Branding */}
      <Motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 h-screen items-center justify-center bg-black/20 backdrop-blur-sm"
      >
        <div className="text-center px-8">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Manage your quizzes, analytics, and insights from your personal
            dashboard.
          </p>
        </div>
      </Motion.div>

      {/* Right side - Login Form */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-10 w-11/12 max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Admin Login 🔐
          </h2>

          <div className="flex flex-col gap-4">
            <input
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg text-white shadow-md transition-all ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center my-4">
              <span className="flex-grow h-[1px] bg-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <span className="flex-grow h-[1px] bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 rounded-xl py-3 font-medium hover:bg-gray-100 transition-all active:scale-[0.97]"
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
          </div>
        </div>
      </Motion.div>
    </div>
  );
};

export default Login;
