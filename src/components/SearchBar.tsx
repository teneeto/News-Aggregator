"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={onChange}
          className="w-full p-4 pl-10 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default SearchBar;
