import express from 'express';
import {
  addevent,
  deleteevent,
  editevent,
  viewevent,
} from '../controllers/event.controller.js';
import upload from '../middleware/multer.js';

const eventRouter = express.Router();

eventRouter.post('/add', upload.single('file'), addevent);
eventRouter.get('/view', viewevent);
eventRouter.put('/edit/:id', editevent);
eventRouter.delete('/delete/:id', deleteevent);

export default eventRouter;
