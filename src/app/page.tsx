"use client";

import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [query, setQuery] = useState("technology");
  const { data, isLoading, error } = useNews(query);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading && (
          <div className="text-center text-gray-600">Loading...</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            {(error as Error).message}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">NewsAPI Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.newsAPI?.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description || "No description available."}
                link={`/news/${encodeURIComponent(article.title)}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">The Guardian Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.guardianAPI?.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description || "No description available."}
                link={`/news/${encodeURIComponent(article.title)}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">New York Times Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data?.nytimesAPI?.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description || "No description available."}
                link={`/news/${encodeURIComponent(article.title)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
