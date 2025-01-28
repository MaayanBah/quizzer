import { useQuery } from "@tanstack/react-query";
import Quiz from "../entities/Quiz";
import ApiClient from "../services/api-client";
import { AxiosError } from "axios";

const apiClient = new ApiClient<Quiz>("/quizzes");

const useQuiz = (quizId: string) =>
  useQuery<Quiz, AxiosError>({
    queryKey: ["quiz", quizId],
    queryFn: () => apiClient.get(quizId),
  });

export default useQuiz;
