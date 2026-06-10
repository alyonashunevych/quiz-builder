/* eslint-disable no-console */
'use strict';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { errorMiddleware } from './middlewares/errorMiddleware.ts';
import { quizzesRouter } from './routes/quizzes.router.ts';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.use('/quizzes', quizzesRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Server is running'));
