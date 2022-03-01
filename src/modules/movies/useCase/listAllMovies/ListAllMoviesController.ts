import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllMoviesUseCase } from "./ListAllMoviesUseCase";

class ListAllMoviesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAllMoviesUseCase = container.resolve(ListAllMoviesUseCase);

    const movie = await listAllMoviesUseCase.execute(id);

    return response.status(201).json(movie);
  }
}

export { ListAllMoviesController }
