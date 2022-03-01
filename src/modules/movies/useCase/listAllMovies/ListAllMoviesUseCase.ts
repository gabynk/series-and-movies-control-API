import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../repositories/IMoviesRepository";
import { Movies } from "../../infra/typeorm/entities/Movies";

@injectable()
class ListAllMoviesUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) {}

  async execute(user_id: string): Promise<Movies[]> {
    const listAllMovies = await this.moviesRepository.listAll(user_id);

    return listAllMovies
  }
}

export { ListAllMoviesUseCase }
