import React from "react";

const ExplanationPanel = ({
  question,
  show,
  nextQuestion,
  prevQuestion,
  currentIndex,
  totalQuestions,
}) => {
  if (!question || !show) return null;

  const letters = ["A", "B", "C", "D"];
  const correctIndex = letters.indexOf(question.answer);
  const correctText = question.options?.[correctIndex] ?? "";

  return (
    <div
      className="bg-gray-900/80 border border-gray-700 rounded-3xl 
      shadow-xl backdrop-blur-lg p-6 h-full overflow-y-auto custom-scrollbar flex flex-col"
    >
      <h3
        className="text-2xl font-bold text-purple-300 mb-4 border-b 
      border-purple-300/30 pb-2 text-center"
      >
        🧠 Explanation
      </h3>

      <p className="mb-4 text-lg">
        ✅ <strong className="text-green-300">Correct Answer:</strong>
        <span className="text-yellow-400">{` ${question.answer}. ${correctText}`}</span>
      </p>

      <p className="text-md text-gray-300 leading-relaxed flex-1">
        💡 <strong className="text-cyan-400">Detailed Explanation:</strong>
        {` ${question.explanation}`}
      </p>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/50">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg
                     hover:bg-gray-600 transition disabled:opacity-40"
        >
          ← Previous
        </button>

        <p className="text-gray-400 text-sm">
          {currentIndex + 1} / {totalQuestions}
        </p>

        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-cyan-500 text-gray-900 rounded-lg
                     hover:bg-cyan-400 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ExplanationPanel;
