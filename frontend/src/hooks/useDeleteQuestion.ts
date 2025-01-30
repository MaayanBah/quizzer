import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import ApiClient from "../services/api-client";

const useDeleteQuestion = (quizId: string) => {
  const queryClient = useQueryClient();
  const apiClient = new ApiClient(`/quizzes/${quizId}/questions`);

  return useMutation<AxiosResponse, AxiosError, string>(
    (questionId) => apiClient.delete(questionId),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions", quizId]);
      },
    }
  );
};

export default useDeleteQuestion;
