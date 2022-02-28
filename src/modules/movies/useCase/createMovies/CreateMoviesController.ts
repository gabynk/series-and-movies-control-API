import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateMoviesUseCase } from "./CreateMoviesUseCase";

class CreateMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      title,
      duration,
      summary,
      genre,
      episode,
      rating,
      watched,
      watched_at,
      release_at,
    } = request.body;

    const createMoviesUseCase = container.resolve(CreateMoviesUseCase);

    const movie = await createMoviesUseCase.execute({
      user_id: id,
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

    return response.status(201).json(movie);
  }
}

export { CreateMoviesController }
