export interface NewsArticle {
  title: string;
  description: string;
  link: string;
  urlToImage: string;
}

export interface NewsAPIResponse {
  newsAPI: NewsArticle[];
  guardianAPI: NewsArticle[];
  nytimesAPI: NewsArticle[];
}
