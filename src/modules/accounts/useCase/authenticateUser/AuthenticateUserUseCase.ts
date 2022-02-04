import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe"

import authTokens from "../../../../config/authTokens";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository"
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "../../../../modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const existUser = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = authTokens;

    if (!existUser)
      throw new AppError("Email or password incorrect");

    const passwordMatch = await compare(password, existUser.password)

    if (!passwordMatch)
      throw new AppError("Email or password incorrect")

    const token = sign({}, secret_token, {
      subject: existUser.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: existUser.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usersTokenRepository.create({
      user_id: existUser.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      user: {
        name: existUser.name,
        email: existUser.email,
      },
      token,
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }
