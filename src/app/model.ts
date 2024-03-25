
export type FormData = {
  question: string;
  options: string[];
};

export type CreateQuestionResponse = {
  [key: string]: {
    question: string;
    options: string[];
  };
};