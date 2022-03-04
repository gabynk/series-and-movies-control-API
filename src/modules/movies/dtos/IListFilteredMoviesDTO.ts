interface IListFilteredMoviesDTO {
  user_id: string;
  title?: string;
  genre?: string;
  rating?: string;
  watched?: boolean;
}

export { IListFilteredMoviesDTO }
