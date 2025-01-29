import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Question from "../entities/Question";
import ApiClient from "../services/api-client";

const useQuestions = (quizId: string) => {
  const apiClient = new ApiClient<Question>(`/quizzes/${quizId}/questions/`);
  return useQuery<Question[], AxiosError>({
    queryKey: ["questions", quizId],
    queryFn: () => apiClient.getAll(),
  });
};

export default useQuestions;
