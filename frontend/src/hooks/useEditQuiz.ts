import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Quiz from "../entities/Quiz";

const apiClient = new ApiClient<Quiz>("/quizzes");

const useEditQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (params: { id: string; data: Partial<Quiz> }) =>
      apiClient.patch(params.id, params.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz"]);
      },
    }
  );
};

export default useEditQuiz;
