import axios from "axios";

// Define API endpoints Keys
const API_KEYS = {
  newsApi: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  guardian: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
  nytimes: process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
};

// Define API URIs
const newsApiUri = "https://newsapi.org/v2/everything";
const guardianApiUri = "https://content.guardianapis.com/search";
const nytimesApiUri =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Fetch news from NewsAPI
export const fetchNewsAPI = async (query: string) => {
  const response = await axios.get(newsApiUri, {
    params: { q: query, apiKey: API_KEYS.newsApi },
  });
  return response.data.articles;
};

// Fetch news from The Guardian
export const fetchGuardianAPI = async (query: string) => {
  const response = await axios.get(guardianApiUri, {
    params: { q: query, "api-key": API_KEYS.guardian },
  });
  return response.data.response.results;
};

// Fetch news from New York Times
export const fetchNYTimesAPI = async (query: string) => {
  const response = await axios.get(nytimesApiUri, {
    params: { q: query, "api-key": API_KEYS.nytimes },
  });
  return response.data.response.docs;
};

// Fetch all news sources together
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

// Fetch a single news article by its title
export const fetchNewsDetail = async (newsId: string) => {
  const decodedTitle = decodeURIComponent(newsId);

  const newsArticles = await Promise.all([
    fetchNewsAPI(decodedTitle),
    fetchGuardianAPI(decodedTitle),
    fetchNYTimesAPI(decodedTitle),
  ]);

  const allArticles = [
    ...newsArticles[0],
    ...newsArticles[1],
    ...newsArticles[2],
  ];

  return allArticles.find((article) =>
    article.title.toLowerCase().includes(decodedTitle.toLowerCase())
  );
};
