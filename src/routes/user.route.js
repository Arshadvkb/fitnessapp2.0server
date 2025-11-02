import express from 'express';
import { getAiRecomendation } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/getAiResponse/:id', getAiRecomendation);


export default userRouter