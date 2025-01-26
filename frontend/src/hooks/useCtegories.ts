import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient from "../services/api-client";

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

const apiClient = new ApiClient<Category>("/categories");

const useCategories = () =>
  useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useCategories;
