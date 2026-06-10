export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type Question = {
  id: number
  type: QuestionType
  question: string
  answers?: string[]
};
