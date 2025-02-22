import {
  useInfiniteQuery,
  QueryFunctionContext,
  InfiniteData,
} from "@tanstack/react-query";
import { fetchAllNews } from "@/services/newsService";
import type { NewsAPIResponse } from "@/types/types";

export const useNews = (query: string) => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    NewsAPIResponse,
    Error,
    InfiniteData<NewsAPIResponse>,
    [string, string],
    number
  >({
    queryKey: ["news", query],
    queryFn: ({
      pageParam = 1,
    }: QueryFunctionContext<[string, string], number>) =>
      fetchAllNews(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (
        lastPage.newsAPI.length < 9 &&
        lastPage.guardianAPI.length < 9 &&
        lastPage.nytimesAPI.length < 9
      ) {
        return undefined;
      }
      return pages.length + 1;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
