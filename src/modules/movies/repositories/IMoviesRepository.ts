import { ICreateMoviesDTO } from "../dtos/ICreateMoviesDTO";
import { IListFilteredMoviesDTO } from "../dtos/IListFilteredMoviesDTO";
import { IUpdateMoviesDTO } from "../dtos/IUpdateMoviesDTO";
import { Movies } from "../infra/typeorm/entities/Movies";

interface IMoviesRepository {
  create(data: ICreateMoviesDTO): Promise<Movies>;
  findByTitle(title: string): Promise<Movies>;
  findById(id: string): Promise<Movies>;
  listAll(user_id: string): Promise<Movies[]>;
  listFiltered(data: IListFilteredMoviesDTO): Promise<Movies[]>;
  update(data: IUpdateMoviesDTO): Promise<Movies>;
}

export { IMoviesRepository }
