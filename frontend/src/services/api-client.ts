import axios, { AxiosRequestConfig } from "axios";

const token = localStorage.getItem("access_token");

export const authAxiosInstance = axios.create({
  baseURL: "https://quizzerapp-2c174419668c.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `JWT ${token}` : "",
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

  get = (identifier: string) => {
    return authAxiosInstance
      .get<T>(this.endpoint + "/" + identifier)
      .then((res) => res.data);
  };

  patch(identifier: string, data: Partial<T>) {
    return authAxiosInstance
      .patch<T>(this.endpoint + "/" + identifier, data)
      .then((res) => res.data);
  }

  post = (data: Partial<T>, requestConfig?: AxiosRequestConfig) =>
    authAxiosInstance
      .post<T>(this.endpoint, data, requestConfig)
      .then((res) => res.data);

  delete = (identifier: string) =>
    authAxiosInstance.delete(`${this.endpoint}/${identifier}`);
}

export default ApiClient;
