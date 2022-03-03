import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateMoviesUseCase } from "./UpdateMoviesUseCase";

class UpdateMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      movie_id,
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

    const updateMoviesUseCase = container.resolve(UpdateMoviesUseCase);

    const movie = await updateMoviesUseCase.execute({
      user_id: id,
      movie_id,
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

    return response.status(200).json(movie);
  }
}

export { UpdateMoviesController }
