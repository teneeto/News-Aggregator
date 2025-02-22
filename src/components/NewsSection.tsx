"use client";
import React from "react";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/types/types";

interface NewsSectionProps {
  id: string;
  title: string;
  articles: NewsArticle[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ id, title, articles }) => {
  return (
    <div id={id}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
