import { IUpdateMoviesDTO } from "../../../../modules/movies/dtos/IUpdateMoviesDTO";
import { ICreateMoviesDTO } from "../../../../modules/movies/dtos/ICreateMoviesDTO";
import { Movies } from "../../../../modules/movies/infra/typeorm/entities/Movies";
import { IListFilteredMoviesDTO } from "../../../../modules/movies/dtos/IListFilteredMoviesDTO";
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

  async findById(id: string): Promise<Movies> {
    return this.movies.find((movie) => movie.id === id);
  }

  async listAll(user_id: string): Promise<Movies[]> {
    const list = this.movies.filter((movie) => movie.user_id === user_id);

    return list;
  }

  async update(data: IUpdateMoviesDTO): Promise<Movies> {
    this.movies = this.movies.map((movie) => {
      if (movie.user_id === data.user_id) {
        return {
          ...movie,
          ...data
        }
      }
      return movie
    })

    return this.movies.find((movie) => movie.user_id === data.user_id);
  }

  async listFiltered({
    user_id,
    title,
    genre,
    rating,
    watched
  }: IListFilteredMoviesDTO): Promise<Movies[]> {
    const list = this.movies.filter((movie) => movie.user_id === user_id && (
      title && movie.title === title ||
      genre && movie.genre === genre ||
      rating && movie.rating === rating ||
      watched && movie.watched === watched));

    return list;
  }
}

export { MoviesRepositoryInMemory }
