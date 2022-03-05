import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUserDTO } from "../dtos/IUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(data: IUserDTO): Promise<User>;
}

export { IUsersRepository }
