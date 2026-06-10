import { apiClient } from "../http/apiClient";
import type { QuestionDTO } from "../types/QuestionDTO";

export const quizzesService = {
  createQuiz: (title: string, questions: QuestionDTO[]) => {
    return apiClient.post(`/quizzes`, { title, questions });
  },

  getAllQuizzes: () => {
    return apiClient.get(`/quizzes`);
  },

  getQuiz: (id: number)=> {
    return apiClient.get(`/quizzes/${id}`);
  },

  deleteQuiz: (id: number) => {
    return apiClient.delete(`/quizzes/${id}`);
  },
};
