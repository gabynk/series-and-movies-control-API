import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const alreadyExist = await this.usersRepository.findByEmail(email);

    if (alreadyExist) {
      throw new AppError("User already exists");
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    });

    return user;
   }
}

export { CreateUserUseCase }
