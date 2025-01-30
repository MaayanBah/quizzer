import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Answer from "../entities/Answer";
import ApiClient from "../services/api-client";

const useAnswers = (quizId: string, questionId: string) => {
  const apiClient = new ApiClient<Answer>(
    `/quizzes/${quizId}/questions/${questionId}/answers/`
  );
  return useQuery<Answer[], AxiosError>({
    queryKey: ["answers", quizId, questionId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useAnswers;
