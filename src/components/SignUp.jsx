// src/components/Signup.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { motion as Motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirm) return alert("All fields are required!");
    if (password !== confirm) return alert("Passwords do not match!");

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed up with Google successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Left side Branding */}
      <Motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 h-screen items-center justify-center bg-black/20 backdrop-blur-sm"
      >
        <div className="text-center px-8">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            Create Your Account 🚀
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Join our quiz platform and unlock amazing features & insights!
          </p>
        </div>
      </Motion.div>

      {/* Signup Form */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <div className="bg-white text-gray-900 rounded-3xl shadow-2xl p-10 w-11/12 max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Sign Up 📝
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

            <input
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-indigo-500 transition-all placeholder-gray-400"
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg text-white shadow-md transition-all ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.97]"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="flex items-center my-4">
              <span className="flex-grow h-[1px] bg-gray-300" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <span className="flex-grow h-[1px] bg-gray-300" />
            </div>

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 rounded-xl py-3 font-medium hover:bg-gray-100 transition-all active:scale-[0.97]"
            >
              <FcGoogle className="text-2xl" />
              Sign up with Google
            </button>

            <p className="text-sm text-gray-500 text-center mt-3">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-indigo-600 cursor-pointer font-semibold"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </Motion.div>
    </div>
  );
};

export default Signup;
