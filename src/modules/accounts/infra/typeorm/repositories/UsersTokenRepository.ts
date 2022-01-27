import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../../../modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../../../modules/accounts/repositories/IUsersTokenRepository";
import { UsersToken } from "../entities/UsersToken";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>;

  constructor() {
    this.repository = getRepository(UsersToken);
  }

  async create({
    refresh_token,
    user_id,
    expires_date
  }: ICreateUserTokenDTO): Promise<UsersToken> {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    });

    await this.repository.save(userToken);

    return userToken
  }

}

export { UsersTokenRepository }
