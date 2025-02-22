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
      {error && <p>{(error as Error).message}</p>}

      <h2>NewsAPI Articles</h2>
      <div>
        {data?.newsAPI?.map((article, index) => (
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
        {data?.guardianAPI?.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            description={article.description || "No description available."}
            link={`/news/${encodeURIComponent(article.title)}`}
          />
        ))}
      </div>

      <h2>New York Times Articles</h2>
      <div>
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
  );
}
