import { create } from "zustand";

interface NewsState {
  query: string;
  sources: string[];
  setQuery: (query: string) => void;
  setSources: (sources: string[]) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  query: "technology",
  sources: ["NewsAPI", "Guardian", "NYTimes"],
  setQuery: (query) => set({ query }),
  setSources: (sources) => set({ sources }),
}));
