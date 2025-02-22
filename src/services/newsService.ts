import axios from "axios";
import { NewsAPIResponse, NewsArticle } from "@/types/types";
import {
  GuardianResponseData,
  NewsAPIResponseData,
  NYTimesResponseData,
} from "./types";

// API keys and URIs (no changes)
const API_KEYS = {
  newsApi: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  guardian: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
  nytimes: process.env.NEXT_PUBLIC_NYTIMES_API_KEY,
};

const newsApiUri = "https://newsapi.org/v2/everything";
const guardianApiUri = "https://content.guardianapis.com/search";
const nytimesApiUri =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Fetch news from NewsAPI with pagination
export const fetchNewsAPI = async (
  query: string,
  page: number = 1
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NewsAPIResponseData>(newsApiUri, {
      params: { q: query, pageSize: 9, page, apiKey: API_KEYS.newsApi },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
};

// Fetch news from The Guardian with pagination
export const fetchGuardianAPI = async (
  query: string,
  page: number = 1
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<GuardianResponseData>(guardianApiUri, {
      params: { q: query, "api-key": API_KEYS.guardian, "page-size": 9, page },
    });

    const transformedResults: NewsArticle[] =
      response.data.response.results.map(
        (article): NewsArticle => ({
          title: article.webTitle || "No title available",
          description: article.fields?.trailText || "No description available.",
          content: article.fields?.bodyText || "No content available.",
          urlToImage: article.fields?.thumbnail,
        })
      );
    return transformedResults;
  } catch (error) {
    console.error("Error fetching from Guardian:", error);
    return [];
  }
};

// Fetch news from NYTimes with pagination
export const fetchNYTimesAPI = async (
  query: string,
  page: number = 1
): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NYTimesResponseData>(nytimesApiUri, {
      params: {
        q: query,
        "api-key": API_KEYS.nytimes,
        page,
      },
    });

    const transformedResults: NewsArticle[] = response.data.response.docs
      .slice(0, 9)
      .map(
        (article): NewsArticle => ({
          title: article.headline?.main || "No title available",
          description: article.snippet || "No description available.",
          content: article.lead_paragraph || "No content available.",
          urlToImage: article.multimedia?.[0]?.url
            ? `https://static01.nyt.com/${article.multimedia[0].url}`
            : "null",
        })
      );
    return transformedResults;
  } catch (error) {
    console.error("Error fetching from NYTimes:", error);
    return [];
  }
};

// Fetch all news sources together with pagination
export const fetchAllNews = async (
  query: string,
  page: number
): Promise<NewsAPIResponse> => {
  try {
    const [newsAPI, guardianAPI, nytimesAPI] = await Promise.all([
      fetchNewsAPI(query, page),
      fetchGuardianAPI(query, page),
      fetchNYTimesAPI(query, page),
    ]);

    return {
      newsAPI,
      guardianAPI,
      nytimesAPI,
    };
  } catch (error) {
    console.error("Error fetching all news:", error);
    return {
      newsAPI: [],
      guardianAPI: [],
      nytimesAPI: [],
    };
  }
};

// Fetch a single news article by its title
export const fetchNewsDetail = async (
  newsId: string
): Promise<NewsArticle | undefined> => {
  const decodedTitle = decodeURIComponent(newsId);

  try {
    const newsArticles = await Promise.all([
      fetchNewsAPI(decodedTitle),
      fetchGuardianAPI(decodedTitle),
      fetchNYTimesAPI(decodedTitle),
    ]);

    const allArticles: NewsArticle[] = [
      ...newsArticles[0],
      ...newsArticles[1],
      ...newsArticles[2],
    ];

    return allArticles.find((article) =>
      article.title.toLowerCase().includes(decodedTitle.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return undefined;
  }
};
