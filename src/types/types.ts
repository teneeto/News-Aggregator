export interface NewsArticle {
  title: string;
  description: string;
  content?: string;
  urlToImage?: string;
}

export interface NewsAPIResponse {
  newsAPI: NewsArticle[];
  guardianAPI: NewsArticle[];
  nytimesAPI: NewsArticle[];
}
