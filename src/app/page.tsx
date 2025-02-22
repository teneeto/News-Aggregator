"use client";
import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Breadcrumbs from "../components/Breadcrumbs";
import NewsSection from "../components/NewsSection";
import LoadMoreButton from "../components/LoadMoreButton";

export default function Home() {
  const [query, setQuery] = useState("technology");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews(query);

  // Combine articles from all fetched pages
  const newsAPIArticles = data?.pages.flatMap((page) => page.newsAPI) || [];
  const guardianArticles =
    data?.pages.flatMap((page) => page.guardianAPI) || [];
  const nytimesArticles = data?.pages.flatMap((page) => page.nytimesAPI) || [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SearchBar query={query} onChange={(e) => setQuery(e.target.value)} />
      <Breadcrumbs />
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {isLoading && <p className="text-center text-lg">Loading...</p>}
        {error && (
          <p className="text-center text-lg text-red-500">
            {(error as Error).message}
          </p>
        )}
        <NewsSection
          id="newsapi"
          title="NewsAPI Articles"
          articles={newsAPIArticles}
        />
        <NewsSection
          id="guardian"
          title="The Guardian Articles"
          articles={guardianArticles}
        />
        <NewsSection
          id="nytimes"
          title="New York Times Articles"
          articles={nytimesArticles}
        />
        <LoadMoreButton
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={!!hasNextPage}
        />
      </div>
    </div>
  );
}
