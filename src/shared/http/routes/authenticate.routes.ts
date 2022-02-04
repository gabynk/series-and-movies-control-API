import { Router } from "express";

import { RefreshTokenController } from "../../../modules/accounts/useCase/refreshToken/RefreshTokenController";
import { AuthenticateUserController } from "../../../modules/accounts/useCase/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/session", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token/:token", refreshTokenController.handle);

export { authenticateRoutes }
