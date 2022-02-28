import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { CreateUserUseCase } from "../../../accounts/useCase/createUser/CreateUserUseCase";
import { CreateMoviesUseCase } from "./CreateMoviesUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let moviesRepositoryInMemory: MoviesRepositoryInMemory
let createMoviesUseCase: CreateMoviesUseCase
let createUserUseCase: CreateUserUseCase

describe("Create Movies", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    moviesRepositoryInMemory = new MoviesRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    createMoviesUseCase = new CreateMoviesUseCase(moviesRepositoryInMemory)
  })

  it("should be able to create movie", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    const createUser = await createUserUseCase.execute(user)

    const createMovie = await createMoviesUseCase.execute({
      user_id: createUser.id,
      title: 'test title',
      duration: 60,
      summary: 'test summary',
      genre: 'test genre',
      episode: 'test ep',
      rating: 'test rating',
      watched: false,
      watched_at: new Date,
      release_at: new Date,
    })

    expect(createMovie).toHaveProperty("id")
  })

  it("should not be able to create movie if already exists a same title", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      const createUser = await createUserUseCase.execute(user)

      const movie = {
        user_id: createUser.id,
        title: 'test title',
        duration: 60,
        summary: 'test summary',
        genre: 'test genre',
        episode: 'test ep',
        rating: 'test rating',
        watched: false,
        watched_at: new Date,
        release_at: new Date,
      }

      await createMoviesUseCase.execute(movie)
      await createMoviesUseCase.execute(movie)
    }).rejects.toEqual(new AppError("Movie already exists"))
  })
})
