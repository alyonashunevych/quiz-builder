/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from 'express';

import { quizzesRepository } from '../entity/quizzes.repository.ts';
import { ApiError } from '../exeptions/api.error.ts';
import { validateQuizTitle } from '../../../frontend/utils/validators.ts';

const validateQuizPayload = (data: any) => {
  const { title, questions } = data;

  if (!title || typeof title !== 'string') {
    throw ApiError.badRequest('Title is required');
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw ApiError.badRequest('Quiz must have questions');
  }

  for (const q of questions) {
    if (!q.question || typeof q.question !== 'string') {
      throw ApiError.badRequest('Question is required');
    }

    if (!q.type) {
      throw ApiError.badRequest('Question type is required');
    }

    if (q.type === 'CHECKBOX') {
      if (!Array.isArray(q.answers) || q.answers.length < 2) {
        throw ApiError.badRequest(
          'Checkbox question must have at least 2 answers',
        );
      }

      if (q.answers.some((a: any) => typeof a !== 'string')) {
        throw ApiError.badRequest('Answers must be strings');
      }
    } else {
      q.answers = null;
    }
  }

  return {
    title: title.trim(),
    questions,
  };
};

const createQuiz: RequestHandler = async (req, res) => {
  const { title, questions } = validateQuizPayload(req.body);

  const error = validateQuizTitle(title);

  if (error) {
    throw ApiError.badRequest(error);
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw ApiError.badRequest('Quiz must contain at least one question');
  }

  const quiz = await quizzesRepository.create(
    title.trim(),
    questions,
  );

  res.status(201).json(quiz);
};

const getQuizzes: RequestHandler = async (_req, res) => {
  const quizzes = await quizzesRepository.getAll();

  res.json(quizzes);
};

const getQuiz: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const quizId = Number(id);

  if (Number.isNaN(quizId)) {
    throw ApiError.badRequest('Invalid quiz id');
  }

  const quiz = await quizzesRepository.getById(quizId);

  if (!quiz) {
    throw ApiError.notFound();
  }

  res.json(quiz);
};

const deleteQuiz: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const quizId = Number(id);

  if (Number.isNaN(quizId)) {
    throw ApiError.badRequest('Invalid quiz id');
  }

  const quiz = await quizzesRepository.getById(quizId);

  if (!quiz) {
    throw ApiError.notFound();
  }

  await quizzesRepository.remove(quizId);

  res.sendStatus(204);
};

export const quizzesController = {
  createQuiz,
  getQuizzes,
  getQuiz,
  deleteQuiz,
};
