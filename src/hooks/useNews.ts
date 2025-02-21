import { useQuery } from "@tanstack/react-query";
import { fetchAllNews } from "../services/newsService";

export const useNews = (query: string) => {
  return useQuery({
    queryKey: ["news", query],
    queryFn: () => fetchAllNews(query),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
