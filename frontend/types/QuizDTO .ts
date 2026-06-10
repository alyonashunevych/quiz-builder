import type { Question } from "./Question";

export type QuizDTO = {
  title: string
  questions: Question[]
};
