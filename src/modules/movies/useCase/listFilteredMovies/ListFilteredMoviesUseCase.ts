import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../repositories/IMoviesRepository";
import { Movies } from "../../infra/typeorm/entities/Movies";
import { IListFilteredMoviesDTO } from "../../dtos/IListFilteredMoviesDTO";

@injectable()
class ListFilteredMoviesUseCase {
  constructor(
    @inject("MoviesRepository")
    private moviesRepository: IMoviesRepository
  ) {}

  async execute(data: IListFilteredMoviesDTO): Promise<Movies[]> {
    const listAllMovies = await this.moviesRepository.listFiltered(data);

    return listAllMovies
  }
}

export { ListFilteredMoviesUseCase }
