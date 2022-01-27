import { ICreateUserTokenDTO } from "../../../../modules/accounts/dtos/ICreateUserTokenDTO";
import { UsersToken } from "../../../../modules/accounts/infra/typeorm/entities/UsersToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  usersToken: UsersToken[] = [];

  async create({
    refresh_token,
    user_id,
    expires_date
  }: ICreateUserTokenDTO): Promise<UsersToken> {
    const userToken = new UsersToken();

    Object.assign(userToken, {
      refresh_token,
      user_id,
      expires_date
    });

    this.usersToken.push(userToken);

    return userToken;
  }
}

export { UsersTokenRepositoryInMemory }
