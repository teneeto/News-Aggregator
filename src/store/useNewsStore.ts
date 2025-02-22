import { create } from "zustand";

interface NewsState {
  query: string;
  sources: string[];
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  setSources: (sources: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  query: "technology",
  sources: ["NewsAPI", "Guardian", "NYTimes"],
  isLoading: false,
  error: null,
  setQuery: (query) => set({ query }),
  setSources: (sources) => set({ sources }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
