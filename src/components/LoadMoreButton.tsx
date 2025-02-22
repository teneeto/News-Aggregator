"use client";
import React from "react";

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  disabled,
  isFetchingNextPage,
  hasNextPage,
}) => {
  return (
    <div className="text-center mt-8">
      {hasNextPage ? (
        <button
          onClick={onClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          disabled={disabled}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      ) : (
        <p>No more articles</p>
      )}
    </div>
  );
};

export default LoadMoreButton;
