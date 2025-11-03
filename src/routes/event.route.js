import express from 'express';
import { addevent } from '../controllers/event.controller.js';
import upload from '../middleware/multer.js';

const eventRouter = express.Router();

eventRouter.post('/add', upload.single('file'), addevent);

export default eventRouter;
