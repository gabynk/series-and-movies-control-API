import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authTokens from "../../../config/authTokens";
import { AppError } from "../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function verifyAuthentication(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Token not exists", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(token, authTokens.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
