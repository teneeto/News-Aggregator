import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { fetchAllNews } from "@/services/newsService";
import type { NewsAPIResponse } from "@/types/types";

export const useNews = (query: string) => {
  const queryOptions: UseQueryOptions<NewsAPIResponse, Error> = {
    queryKey: ["news", query],
    queryFn: () => fetchAllNews(query),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: navigator.onLine,
  };

  const { data, error, isLoading } = useQuery(queryOptions);

  if (data) {
    console.log("Data fetched successfully:", data);
  }

  if (error) {
    console.error("Error fetching data:", error);
  }

  return { data, error, isLoading };
};
