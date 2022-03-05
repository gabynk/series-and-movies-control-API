import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { UserMap } from "../../mapper/UserMap";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ id, name, email, password, newPassword }: IUpdateUserDTO): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (email) {
      const alreadyExist = await this.usersRepository.findByEmail(email);

      if (alreadyExist) {
        throw new AppError("Email already exists");
      }
    }

    let changedPassword = password;
    if (password) {
      if (!newPassword)
        throw new AppError("Password incorrect")

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch)
        throw new AppError("Password incorrect")

      changedPassword = await hash(newPassword, 8);
    }


    const updateUser = await this.usersRepository.update({
      id,
      name,
      email,
      password: changedPassword
    });

    return UserMap.toDTO(updateUser);
  }
}

export { UpdateUserUseCase }
