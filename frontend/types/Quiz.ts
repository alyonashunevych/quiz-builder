import type { Question } from "./Question";

export type Quiz = {
  id: number
  title: string
  questions: Question[]
};
