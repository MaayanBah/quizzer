import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient from "../services/api-client";
import Question from "../entities/Question";
import QuestionPayload from "../entities/QuestionPayload";

const useAddQuestion = (quizId: string) => {
  const apiClient = new ApiClient<Question>(`/quizzes/${quizId}/questions/`);
  return useMutation<QuestionPayload, AxiosError, QuestionPayload>(
    (newQuestion: QuestionPayload) => apiClient.post(newQuestion)
  );
};

export default useAddQuestion;
