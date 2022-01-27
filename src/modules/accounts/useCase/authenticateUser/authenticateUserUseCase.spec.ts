import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
    dateProvider = new DayjsDateProvider()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      dateProvider,
      usersTokenRepositoryInMemory
    )
  })

  it("should be able to authenticate user", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    await createUserUseCase.execute(user)

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(authenticatedUser).toHaveProperty("token")
  })

  it("should not be able to authenticate if user not existe", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: 'notExist@test.com',
        password: '123'
      })
    }).rejects.toEqual(new AppError("User not exists"))
  })

  it("should not be able to authenticate if password is incorrect", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '123'
      })
    }).rejects.toEqual(new AppError("Email or password incorrect"))
  })
})
