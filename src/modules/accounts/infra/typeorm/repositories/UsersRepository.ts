import { getRepository, Repository } from "typeorm";
import { IUserDTO } from "../../../dtos/IUserDTO";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password
    });

    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email })
  }

  async update(data: IUserDTO): Promise<User> {
    const alredyExist = this.findById(data.id);

    await this.repository.save({ ...alredyExist, ...data });

    return this.findById(data.id)
  }
}

export { UsersRepository }
