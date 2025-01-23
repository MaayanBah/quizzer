import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

interface SignupErrorResponse {
  first_name?: string[];
  last_name?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
}

const useSignup = () => {
  return useMutation<
    void,
    AxiosError<SignupErrorResponse>,
    {
      username: string;
      password: string;
      email: string;
      first_name: string;
      last_name: string;
    }
  >(
    (credentials: {
      username: string;
      password: string;
      email: string;
      first_name: string;
      last_name: string;
    }) => apiClient.register(credentials)
  );
};

export default useSignup;
