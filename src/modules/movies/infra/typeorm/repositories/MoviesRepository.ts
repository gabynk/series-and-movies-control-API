import { getRepository, Repository } from "typeorm";

import { ICreateMoviesDTO } from "../../../../../modules/movies/dtos/ICreateMoviesDTO";
import { IMoviesRepository } from "../../../../../modules/movies/repositories/IMoviesRepository";
import { IUpdateMoviesDTO } from "../../../../../modules/movies/dtos/IUpdateMoviesDTO";
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

  async findById(id: string): Promise<Movies> {
    return this.repository.findOne(id);
  }

  async listAll(user_id: string): Promise<Movies[]> {
    return this.repository
      .createQueryBuilder("movies")
      .where("movies.user_id = :user_id", { user_id: user_id })
      .getMany();
  }

  async update(data: IUpdateMoviesDTO): Promise<Movies> {
    const alredyExist = this.findById(data.movie_id);

    let updateData = {
      id: data.movie_id,
    }
    delete data.movie_id
    updateData = { ...updateData, ...data }

    return this.repository.save({...alredyExist, ...updateData});
  }
}

export { MoviesRepository }
