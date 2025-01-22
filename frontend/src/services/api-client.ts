import axios from "axios";

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const axiosInstance = axios.create({
  baseURL: "https://quizzerapp-2c174419668c.herokuapp.com",
});

class AuthAPIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (credentials: { username: string; password: string }) => {
    return axiosInstance
      .post<AuthResponse>(`${this.endpoint}/jwt/create/`, credentials)
      .then((res) => res.data);
  };

  register = (userData: {
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => {
    return axiosInstance
      .post(`${this.endpoint}/users/`, userData)
      .then((res) => res.data);
  };
}

const apiClient = new AuthAPIClient("/auth");

export default apiClient;
