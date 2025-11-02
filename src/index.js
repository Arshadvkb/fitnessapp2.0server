import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { db } from './config/mongo.js';

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

app.listen(port, () => {
  console.log('server running at:' + 'http://localhost:3000');
  db();
});
