import { NewsArticle } from "@/types/types";

interface NewsAPIResponseData {
  articles: NewsArticle[];
}

interface GuardianResponseData {
  response: {
    results: Array<{
      webTitle: string;
      fields: {
        trailText: string;
        bodyText: string;
        thumbnail: string;
      };
    }>;
  };
}

interface NYTimesResponseData {
  response: {
    docs: Array<{
      headline: { main: string };
      snippet: string;
      lead_paragraph: string;
      multimedia: Array<{ url: string }>;
    }>;
  };
}

export type {
  NewsAPIResponseData,
  NewsArticle,
  NYTimesResponseData,
  GuardianResponseData,
};
