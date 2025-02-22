"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchNewsDetail } from "../../../services/newsService";
import { useNewsStore } from "../../../store/useNewsStore";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [article, setArticle] = useState<any | null>(null);
  const { isLoading, error, setIsLoading, setError } = useNewsStore();

  useEffect(() => {
    if (!newsId) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const fetchedArticle = await fetchNewsDetail(newsId as string);
        setArticle(fetchedArticle);
      } catch (err) {
        setError("Failed to load the article.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [newsId, setIsLoading, setError]);

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
      <div>{article.content}</div>
    </div>
  );
}
