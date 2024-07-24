export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ChatMessage {
  id: number;
  message: string;
  date: string;
  username: string;
  action: string;
  movieName: string;
}

export interface ResponseData {
  status: string;
  data: ChatMessage[];
}
