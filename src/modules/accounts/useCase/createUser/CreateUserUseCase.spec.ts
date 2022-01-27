import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  });

  it("should be able to create new user", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    const createdUser = await createUserUseCase.execute(user)

    expect(createdUser).toHaveProperty("id")
    expect(createdUser.email).toEqual(user.email)
  })

  it("should not be able to create user if already existe", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      await createUserUseCase.execute(user)
      await createUserUseCase.execute(user)
    }).rejects.toEqual(new AppError("User already exists"))
  })
})
