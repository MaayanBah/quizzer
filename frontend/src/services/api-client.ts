import axios, { AxiosRequestConfig } from "axios";

const token = localStorage.getItem("access_token");

export const authAxiosInstance = axios.create({
  baseURL: "https://quizzerapp-2c174419668c.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? token : "",
  },
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (requestConfig?: AxiosRequestConfig) =>
    authAxiosInstance
      .get<T[]>(this.endpoint, requestConfig)
      .then((res) => res.data);
}

export default ApiClient;
