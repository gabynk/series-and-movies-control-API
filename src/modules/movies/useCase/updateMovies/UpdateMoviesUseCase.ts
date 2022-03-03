import { inject, injectable } from "tsyringe";

import { Movies } from "../../../../modules/movies/infra/typeorm/entities/Movies";
import { IUpdateMoviesDTO } from "../../../../modules/movies/dtos/IUpdateMoviesDTO";
import { IMoviesRepository } from "../../../../modules/movies/repositories/IMoviesRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class UpdateMoviesUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) { }

  async execute(data: IUpdateMoviesDTO): Promise<Movies> {
    const existMovie = await this.moviesRepository.findById(data.movie_id);

    if (!existMovie) {
      throw new AppError("Movie not exists");
    }

    const createMovies = await this.moviesRepository.update(data)

    return createMovies;
  }
}

export { UpdateMoviesUseCase }
