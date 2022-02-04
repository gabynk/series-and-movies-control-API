import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refreshtoken = await refreshTokenUseCase.execute(token);

    return response.json(refreshtoken);
  }
}

export { RefreshTokenController }
