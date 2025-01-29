import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ApiClient from "../services/api-client";
import Quiz from "../entities/Quiz";
import QuizPayload from "../entities/QuizPayload";


const apiClient = new ApiClient<Quiz>("/quizzes/");

const useCreateQuiz = () =>
  useMutation<Quiz, AxiosError, QuizPayload>((newQuiz: QuizPayload) =>
    apiClient.post(newQuiz)
  );

export default useCreateQuiz;
