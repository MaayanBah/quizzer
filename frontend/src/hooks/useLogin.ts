import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/auth-api-client";
import useTokenStore from "../state-management/token/store";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

interface ErrorResponse {
  detail?: string;
}
const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();

  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginCredentials
  >(
    (credentials: { username: string; password: string }) =>
      apiClient.login(credentials),
    {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data.access);
        setToken(data.access);
        if (localStorage.getItem("access_token")) {
          navigate("/my-quizzes");
        }
      },
    }
  );
};

export default useLogin;
