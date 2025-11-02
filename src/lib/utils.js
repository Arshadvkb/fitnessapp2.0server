import ai from '../config/genai.js';
export const generateAiResponse = async (promt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: promt,
  });

  return response.text;
};
