"use client";

import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [query, setQuery] = useState("technology");
  const { data, isLoading, error } = useNews(query);

  return (
    <div>
      <Navbar />
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching news</p>}

      <h2>NewsAPI Articles</h2>
      <div>
        {data?.newsAPI?.map((article: any, index: number) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description || "No description available."}
            link={`/news/${encodeURIComponent(article.title)}`}
          />
        ))}
      </div>

      <h2>The Guardian Articles</h2>
      <div>
        {data?.guardianAPI?.map((article: any, index: number) => (
          <NewsCard
            key={index}
            title={article.webTitle}
            description={
              article.fields?.trailText || "No description available."
            }
            link={`/news/${encodeURIComponent(article.webTitle)}`}
          />
        ))}
      </div>

      <h2>New York Times Articles</h2>
      <div>
        {data?.nytimesAPI?.map((article: any, index: number) => (
          <NewsCard
            key={index}
            title={article.headline.main}
            description={article.abstract || "No description available."}
            link={`/news/${encodeURIComponent(article.headline.main)}`}
          />
        ))}
      </div>
    </div>
  );
}
