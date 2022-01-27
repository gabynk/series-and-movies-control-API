import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";

interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UsersToken>;
}

export { IUsersTokenRepository }
