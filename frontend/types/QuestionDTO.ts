export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type QuestionDTO = {
  type: QuestionType
  question: string
  answers?: string[]
};
