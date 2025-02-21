import axios from "axios";

// Define API endpoints
const API_KEYS = {
  newsApi: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  guardian: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
  nytimes: process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
};

// Fetch news from NewsAPI
export const fetchNewsAPI = async (query: string) => {
  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params: { q: query, apiKey: API_KEYS.newsApi },
  });
  return response.data.articles;
};

// Fetch news from The Guardian
export const fetchGuardianAPI = async (query: string) => {
  const response = await axios.get(`https://content.guardianapis.com/search`, {
    params: { q: query, "api-key": API_KEYS.guardian },
  });
  return response.data.response.results;
};

// Fetch news from New York Times
export const fetchNYTimesAPI = async (query: string) => {
  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    {
      params: { q: query, "api-key": API_KEYS.nytimes },
    }
  );
  return response.data.response.docs;
};

// Fetch all news sources
export const fetchAllNews = async (query: string) => {
  const [newsAPI, guardianAPI, nytimesAPI] = await Promise.all([
    fetchNewsAPI(query),
    fetchGuardianAPI(query),
    fetchNYTimesAPI(query),
  ]);

  return {
    newsAPI,
    guardianAPI,
    nytimesAPI,
  };
};
