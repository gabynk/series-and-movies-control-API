import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "../../../../modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import authTokens from "../../../../config/authTokens";

interface IPayload {
  sub: string;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(refreshToken: string): Promise<IResponse> {
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = authTokens;

    let verifiedToken: IPayload;

    try {
      verifiedToken = verify(refreshToken, secret_refresh_token) as IPayload;
    } catch (error) {
      throw new AppError("Refresh Token does not exists");
    }

    const { email, sub } = verifiedToken;
    const user_id = sub;

    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    const refreshTokenReturn: IResponse = {
      refresh_token,
      token: newToken,
    }

    return refreshTokenReturn;
  }
}

export { RefreshTokenUseCase }
