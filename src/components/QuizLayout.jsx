import React from "react";
import { motion as Motion } from "framer-motion";
import QuizCard from "./QuizCard";
import ExplanationPanel from "./Explanation";

const QuizLayout = ({
  question,
  nextQuestion,
  prevQuestion,
  currentIndex,
  totalQuestions,
  showExplanation,
  ...restProps
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-4 md:p-6">

      {/* LEFT SIDE: Quiz Card */}
      <Motion.div
        className="md:w-2/3 w-full bg-gray-800/95 border border-gray-700 rounded-3xl shadow-2xl p-6 flex flex-col flex-1 justify-start"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
      >
        <QuizCard
          question={question}
          nextQuestion={nextQuestion}
          prevQuestion={prevQuestion}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          {...restProps}
        />
      </Motion.div>

      {/* RIGHT SIDE: Explanation Panel */}
      {showExplanation && (
        <Motion.div
          className="md:w-1/3 w-full bg-gray-900/90 border border-gray-700 rounded-3xl p-4 shadow-lg flex flex-col overflow-y-auto flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">
            Explanation
          </h2>
          <ExplanationPanel
            question={question}
            show={showExplanation}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
          />
        </Motion.div>
      )}
    </div>
  );
};

export default QuizLayout;
    