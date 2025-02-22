"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNewsStore } from "@/store/useNewsStore";
import { fetchNewsDetail } from "@/services/newsService";
import { NewsArticle } from "@/types/types";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { isValidUrl } from "@/utils/isValidUrl";

export default function NewsDetail() {
  const { newsId } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const { isLoading, error, setIsLoading, setError } = useNewsStore();

  useEffect(() => {
    if (!newsId) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const fetchedArticle = await fetchNewsDetail(newsId as string);
        setArticle(fetchedArticle ?? null);
      } catch (err) {
        console.error("Error in fetchNewsDetail:", err);
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

        {article.urlToImage && isValidUrl(article.urlToImage) ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg mb-6">
            <PhotoIcon className="w-16 h-16 text-gray-500" />
          </div>
        )}

        <div className="text-gray-800 text-lg">{article.content}</div>
      </div>
    </div>
  );
}
