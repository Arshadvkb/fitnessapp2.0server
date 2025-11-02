
import userModel from '../models/user.model.js';
import { generateAiResponse } from '../lib/utils.js';

const getAiRecomendation = async (req, res) => {
  const { id } = req.params;
  const userData = await userModel.findById(id);
  console.log(userData);
  
  const promt = `${userData}You are a personalized fitness and nutrition coach specializing in Kerala-style cuisine. Analyze the following user data and generate tailored recommendations in JSON format only. Do not include any additional text outside the JSON.`;
  const response = await generateAiResponse(promt);
  console.log(response);
  return res.  status(200).json({response})
};
export { getAiRecomendation };