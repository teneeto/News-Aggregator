export interface NewsArticle {
  title: string;
  description: string;
  link: string;
}

export interface NewsAPIResponse {
  newsAPI: NewsArticle[];
  guardianAPI: NewsArticle[];
  nytimesAPI: NewsArticle[];
}
