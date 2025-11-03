import express from 'express';
import { addevent, viewevent } from '../controllers/event.controller.js';
import upload from '../middleware/multer.js';

const eventRouter = express.Router();

eventRouter.post('/add', upload.single('file'), addevent);
eventRouter.get('/view', viewevent);

export default eventRouter;
