import ai from "../config/genai.js";
import jwt from "jsonwebtoken";

export const generateAiResponse = async (promt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: promt,
  });

  return response.text;
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
