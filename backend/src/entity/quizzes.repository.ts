import type { Question } from '@prisma/client';
import { db } from '../utils/db.ts';

const create = async (title: string, questions: Question[]) => {
  return db.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((question) => ({
          type: question.type,
          question: question.question,
          answers: question.answers || null,
        })),
      },
    },
    include: {
      questions: true,
    },
  });
};

const getAll = async () => {
  return db.quiz.findMany({
    include: {
      questions: true,
    },
  });
};

const getById = async (id: number) => {
  return db.quiz.findUnique({
    where: { id },
    include: {
      questions: true,
    },
  });
};

const remove = async (id: number) => {
  return db.quiz.delete({
    where: { id },
  });
};

export const quizzesRepository = {
  create,
  getAll,
  getById,
  remove,
};
