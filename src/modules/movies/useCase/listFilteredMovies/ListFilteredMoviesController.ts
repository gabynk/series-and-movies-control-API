import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFilteredMoviesUseCase } from "./ListFilteredMoviesUseCase";

class ListFilteredMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      title,
      genre,
      rating,
      watched
    } = request.body;

    const listFilteredMoviesUseCase = container.resolve(ListFilteredMoviesUseCase);

    const movies = await listFilteredMoviesUseCase.execute({
      user_id: id,
      title,
      genre,
      rating,
      watched
    });

    return response.status(200).json(movies);
  }
}

export { ListFilteredMoviesController }
