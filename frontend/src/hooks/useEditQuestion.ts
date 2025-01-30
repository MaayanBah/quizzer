import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Question from "../entities/Question";
import ApiClient from "../services/api-client";

const useEditQuestion = (quizId: string) => {
  const apiClient = new ApiClient(`/quizzes/${quizId}/questions`);
  const queryClient = useQueryClient();

  return useMutation<
    Question,
    AxiosError,
    { id: string; data: Partial<Question> }
  >(
    ({ id, data }) =>
      apiClient.patch(id, data).then((response) => response as Question),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["questions", quizId]);
      },
    }
  );
};

export default useEditQuestion;
