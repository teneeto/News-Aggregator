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
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center text-gray-600">Article not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-600 mb-6">{article.description}</p>
        <div className="text-gray-800 text-lg">{article.content}</div>
      </div>
    </div>
  );
}
