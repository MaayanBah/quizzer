import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient from "../services/api-client";
import Question from "../entities/Question";

const useAddQuestion = (quizId: string) => {
  const apiClient = new ApiClient<Question>(`/quizzes/${quizId}/questions/`);
  return useMutation<Question, AxiosError, Question>((newQuestion: Question) =>
    apiClient.post(newQuestion)
  );
};

export default useAddQuestion;
