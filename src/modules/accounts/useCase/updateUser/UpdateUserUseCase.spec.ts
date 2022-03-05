import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let updateUserUseCase: UpdateUserUseCase

describe("Update User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory)
  });

  it("should be able to update user", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    const createdUser = await createUserUseCase.execute(user)

    const updatedUser = await updateUserUseCase.execute({
      id: createdUser.id,
      email: 'test@user.com',
      password: '123456',
      newPassword: '654321'
    })

    expect(updatedUser).toHaveProperty("id")
    expect(updatedUser.email).toEqual('test@user.com')
    expect(updatedUser.id).toEqual(createdUser.id)
  })

  it("should not be able to update user if already existe email", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      const createdUser = await createUserUseCase.execute(user)
      await createUserUseCase.execute({
        name: 'test user 2',
        email: 'test@test.com',
        password: '123456'
      })

      await updateUserUseCase.execute({
        id: createdUser.id,
        email: 'test@test.com',
      })
    }).rejects.toEqual(new AppError("Email already exists"))
  })

  it("should not be able to update user if password not math", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      const createdUser = await createUserUseCase.execute(user)

      await updateUserUseCase.execute({
        id: createdUser.id,
        password: '654321',
        newPassword: '65432'
      })
    }).rejects.toEqual(new AppError("Password incorrect"))
  })
})
