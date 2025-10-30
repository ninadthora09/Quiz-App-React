import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import QuizGenerator from "./components/QuizGenerator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App

