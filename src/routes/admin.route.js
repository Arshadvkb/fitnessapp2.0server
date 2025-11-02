import express from 'express';
import { addTrainer } from '../controllers/admin.controller.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

adminRouter.post('/add-trainer', upload.single('file'), addTrainer);

export default adminRouter;
