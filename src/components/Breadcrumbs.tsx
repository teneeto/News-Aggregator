"use client";
import React from "react";

const Breadcrumbs: React.FC = () => {
  return (
    <div className="px-6 py-4 text-gray-600 flex justify-between items-center">
      <nav className="text-sm">
        <span className="cursor-pointer hover:underline">Home</span> /{" "}
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
  );
};

export default Breadcrumbs;
