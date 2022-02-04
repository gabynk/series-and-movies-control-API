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

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersToken> {
    return this.repository.findOne({
      user_id,
      refresh_token,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokenRepository }
