import { ICreateMoviesDTO } from "../dtos/ICreateMoviesDTO";
import { Movies } from "../infra/typeorm/entities/Movies";

interface IMoviesRepository {
  create(data: ICreateMoviesDTO): Promise<Movies>;
  findByTitle(title: string): Promise<Movies>;
  listAll(user_id: string): Promise<Movies[]>;
}

export { IMoviesRepository }
