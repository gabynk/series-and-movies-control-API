import { getRepository, Repository } from "typeorm";

import { ICreateMoviesDTO } from "../../../../../modules/movies/dtos/ICreateMoviesDTO";
import { IMoviesRepository } from "../../../../../modules/movies/repositories/IMoviesRepository";
import { Movies } from "../entities/Movies";

class MoviesRepository implements IMoviesRepository {
  private repository: Repository<Movies>;

  constructor() {
    this.repository = getRepository(Movies);
  }

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
    const movies = this.repository.create({
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

    return await this.repository.save(movies);
  }

  async findByTitle(title: string): Promise<Movies> {
    return this.repository.findOne({ title });
  }
}

export { MoviesRepository }
