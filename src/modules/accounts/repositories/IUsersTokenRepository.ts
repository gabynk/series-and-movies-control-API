import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UsersToken>;
  findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersToken>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokenRepository }
