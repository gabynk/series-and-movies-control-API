interface IUpdateMoviesDTO {
  user_id: string;
  movie_id: string;
  title: string;
  duration?: number;
  summary?: string;
  genre?: string;
  episode?: string;
  rating?: string;
  watched?: boolean;
  watched_at?: Date;
  release_at?: Date;
}

export { IUpdateMoviesDTO }
