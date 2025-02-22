"use client";

import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

      {/* Search bar with icon */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 pl-10 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Breadcrumbs & Navigation */}
      <div className="px-6 py-4 text-gray-600 flex justify-between items-center">
        <nav className="text-sm">
          <span className="cursor-pointer hover:underline">Home</span> /
          <span className="cursor-pointer hover:underline ml-1">
            Search Results
          </span>
        </nav>
        <div className="space-x-4">
          <a href="#newsapi" className="text-blue-600 hover:underline">
            NewsAPI
          </a>
          <a href="#guardian" className="text-blue-600 hover:underline">
            The Guardian
          </a>
          <a href="#nytimes" className="text-blue-600 hover:underline">
            NY Times
          </a>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {isLoading && <p className="text-center text-lg">Loading...</p>}
        {error && (
          <p className="text-center text-lg text-red-500">
            {(error as Error).message}
          </p>
        )}

        {/* NewsAPI Section */}
        <div id="newsapi">
          <h2 className="text-2xl font-semibold mb-4">NewsAPI Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsAPIArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </div>

        {/* The Guardian Section */}
        <div id="guardian">
          <h2 className="text-2xl font-semibold mb-4">The Guardian Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guardianArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </div>

        {/* NY Times Section */}
        <div id="nytimes">
          <h2 className="text-2xl font-semibold mb-4">
            New York Times Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nytimesArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="text-center mt-8">
          {hasNextPage ? (
            <button
              onClick={() => fetchNextPage()}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </button>
          ) : (
            <p>No more articles</p>
          )}
        </div>
      </div>
    </div>
  );
}
