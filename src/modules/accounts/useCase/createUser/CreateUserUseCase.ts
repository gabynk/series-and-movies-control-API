import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { UserMap } from "../../mapper/UserMap";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const alreadyExist = await this.usersRepository.findByEmail(email);

    if (alreadyExist) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    });

    return UserMap.toDTO(user);
   }
}

export { CreateUserUseCase }
