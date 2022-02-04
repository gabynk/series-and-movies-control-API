import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let refreshTokenUseCase: RefreshTokenUseCase
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider

describe("Refresh Authenticate User", () => {
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
    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokenRepositoryInMemory,
      dateProvider,
    )
  })

  it("should be able to refresh token", async () => {
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

    const refreshAuthenticated = await refreshTokenUseCase.execute(authenticatedUser.refresh_token)

    expect(refreshAuthenticated).toHaveProperty("token")
    expect(refreshAuthenticated).toHaveProperty("refresh_token")
  })

  it("should not be able to refresh token if token is incorrect", async () => {
    expect(async () => {
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

      await refreshTokenUseCase.execute(authenticatedUser.token)
    }).rejects.toEqual(new AppError("Refresh Token does not exists"))
  })
})
