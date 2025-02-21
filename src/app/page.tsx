"use client"; // ✅ Fix: Ensure this file runs as a client component

import { useState } from "react";
import { useNews } from "../hooks/useNews";
import Link from "next/link"; // Import Link

export default function Home() {
  const [query, setQuery] = useState("technology");
  const { data, isLoading, error } = useNews(query);

  return (
    <div>
      <h1>News Aggregator</h1>
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching news</p>}

      <h2>NewsAPI Articles</h2>
      <ul>
        {data?.newsAPI?.map((article: any, index: number) => (
          <li key={index}>
            <Link href={`/news/${article.title}`}>
              {" "}
              {/* Updated Link */}
              {article.title}
            </Link>
          </li>
        ))}
      </ul>

      <h2>The Guardian Articles</h2>
      <ul>
        {data?.guardianAPI?.map((article: any, index: number) => (
          <li key={index}>
            <Link href={`/news/${article.webTitle}`}>
              {" "}
              {/* Updated Link */}
              {article.webTitle}
            </Link>
          </li>
        ))}
      </ul>

      <h2>New York Times Articles</h2>
      <ul>
        {data?.nytimesAPI?.map((article: any, index: number) => (
          <li key={index}>
            <Link href={`/news/${article.headline.main}`}>
              {" "}
              {/* Updated Link */}
              {article.headline.main}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
