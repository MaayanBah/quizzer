import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient from "../services/api-client";

interface QuizPayload {
  title: string;
  description: string;
  category: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: number;
}

const apiClient = new ApiClient<Quiz>("/quizzes/");

const useCreateQuiz = () =>
  useMutation<Quiz, AxiosError, QuizPayload>((newQuiz: QuizPayload) =>
    apiClient.post(newQuiz)
  );

export default useCreateQuiz;
