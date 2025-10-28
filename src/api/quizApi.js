// ✅ Replace with your environment variable OR paste your key directly:
const GEMINI_API_URL = import.meta.env.VITE_URL;
const GEMINI_API_KEY = import.meta.env.VITE_KEY;

// ✅ MAIN FUNCTION
export const fetchQuizQuestions = async (
  topic = "Programming",
  difficulty = "Medium"
) => {
  try {
    // ✅ Build strong prompt inline (cleaned and safe)
    const prompt = `
You are a quiz generator AI.

Task:
- Generate 10 multiple-choice questions about "${topic}".
- Ensure all questions match the "${difficulty}" difficulty level.
- Each question must be unique and non-repetitive.

Formatting Rules:
- Output ONLY valid JSON (no markdown, no comments, no extra text).
- Must be a JSON ARRAY of objects:

[
  {
    "question": "The question text?",
    "options": ["Option text A", "Option text B", "Option text C", "Option text D"],
    "correctAnswer": "Option text EXACTLY matching one from 'options'",
    "explanation": "A brief explanation why the correct answer is correct"
  }
]

Constraints:
- EXACTLY 4 answer options per question.
- "correctAnswer" must match one of the options exactly.
- Do NOT include labels like A/B/C/D.
- Do NOT wrap in code fences.
- Return ONLY the JSON array.
`;

    // ✅ Gemini request payload
    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // ✅ Pull text out of Gemini response safely
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) return [];

    // ✅ Extract only JSON content safely
    const start = textResponse.indexOf("[");
    const end = textResponse.lastIndexOf("]") + 1;
    const jsonString = textResponse.substring(start, end);

    // ✅ Parse JSON safely
    const parsed = JSON.parse(jsonString);

    // ✅ Add IDs + difficulty
    return parsed.map((q, idx) => ({
      id: idx + 1,
      difficulty,
      ...q
    }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
};
