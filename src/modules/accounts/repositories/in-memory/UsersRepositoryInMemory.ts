import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserDTO } from "../../dtos/IUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async update(data: IUserDTO): Promise<User> {
    this.users = this.users.map((user) => {
      if (user.id === data.id) {
        return {
          ...user,
          ...data
        }
      }
      return user
    })

    return this.findById(data.id);
  }
}

export { UsersRepositoryInMemory }
