import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, newPassword } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      newPassword
    });

    return response.status(201).json(user);
  }
}

export { UpdateUserController }
