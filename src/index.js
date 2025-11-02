import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { db } from './config/mongo.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';

//server setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const port = process.env.port;

//api end points
app.get('/', (req, res) => {
  res.send('fitness app 2.0');
});

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use("/api/user",userRouter)

app.listen(port, () => {
  console.log('server running at:' + 'http://localhost:3000');
  db();
});
