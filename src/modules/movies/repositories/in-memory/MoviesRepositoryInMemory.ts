import { ICreateMoviesDTO } from "../../../../modules/movies/dtos/ICreateMoviesDTO";
import { Movies } from "../../../../modules/movies/infra/typeorm/entities/Movies";
import { IMoviesRepository } from "../IMoviesRepository";

class MoviesRepositoryInMemory implements IMoviesRepository {
  movies: Movies[] = [];

  async create({
    user_id,
    title,
    duration,
    summary,
    genre,
    episode,
    rating,
    watched,
    watched_at,
    release_at,
  }: ICreateMoviesDTO): Promise<Movies> {
    const movies = new Movies();

    Object.assign(movies, {
      user_id,
      title,
      duration,
      summary,
      genre,
      episode,
      rating,
      watched,
      watched_at,
      release_at,
    });

    this.movies.push(movies);

    return movies;
  }

  async findByTitle(title: string): Promise<Movies> {
    return this.movies.find((movie) => movie.title === title);
  }
}

export { MoviesRepositoryInMemory }