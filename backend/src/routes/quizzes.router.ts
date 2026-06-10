import { Router } from 'express';

import { quizzesController } from '../controllers/quizzes.controller.ts';
import { catchError } from '../utils/catchError.ts';

export const quizzesRouter = Router();

quizzesRouter.post('/', catchError(quizzesController.createQuiz));
quizzesRouter.get('/', catchError(quizzesController.getQuizzes));
quizzesRouter.get('/:id', catchError(quizzesController.getQuiz));
quizzesRouter.delete('/:id', catchError(quizzesController.deleteQuiz));
