"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Updated to use useParams
import { fetchNewsDetail } from "../../../services/newsService"; // Update path accordingly

export default function NewsDetail() {
  const { newsId } = useParams(); // Get dynamic route parameter
  const [article, setArticle] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsId) return; // Return early if newsId is not available

    const fetchArticle = async () => {
      try {
        // Ensure newsId is a string, even if it's an array
        const articleId = Array.isArray(newsId) ? newsId[0] : newsId;

        const fetchedArticle = await fetchNewsDetail(articleId); // Pass as string
        setArticle(fetchedArticle);
      } catch (err) {
        setError("Failed to load the article.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [newsId]); // Re-run the effect when newsId changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <div>{article.content}</div> {/* Display the full article content */}
    </div>
  );
}
