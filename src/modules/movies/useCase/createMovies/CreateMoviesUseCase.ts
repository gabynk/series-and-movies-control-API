import { inject, injectable } from "tsyringe";

import { Movies } from "../../../../modules/movies/infra/typeorm/entities/Movies";
import { ICreateMoviesDTO } from "../../../../modules/movies/dtos/ICreateMoviesDTO";
import { IMoviesRepository } from "../../../../modules/movies/repositories/IMoviesRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateMoviesUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) {}

  async execute({
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
    const existMovie = await this.moviesRepository.findByTitle(title);

    if (existMovie) {
      throw new AppError("Movie already exists");
    }

    const createMovies = await this.moviesRepository.create({
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
    })

    return createMovies;
  }
}

export { CreateMoviesUseCase }
