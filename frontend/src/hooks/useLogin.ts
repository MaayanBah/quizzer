import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../state-management/token/store";

const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();

  return useMutation(
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
      onError: (error) => {
        console.error("Login failed:", error);
      },
    }
  );
};

export default useLogin;
