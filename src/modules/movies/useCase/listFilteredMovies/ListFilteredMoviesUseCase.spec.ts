import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { CreateUserUseCase } from "../../../accounts/useCase/createUser/CreateUserUseCase";
import { CreateMoviesUseCase } from "../createMovies/CreateMoviesUseCase";
import { ListFilteredMoviesUseCase } from "./ListFilteredMoviesUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let moviesRepositoryInMemory: MoviesRepositoryInMemory
let createMoviesUseCase: CreateMoviesUseCase
let createUserUseCase: CreateUserUseCase
let listFilteredMoviesUseCase: ListFilteredMoviesUseCase

describe("List Filtered Movies", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    moviesRepositoryInMemory = new MoviesRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    createMoviesUseCase = new CreateMoviesUseCase(moviesRepositoryInMemory)
    listFilteredMoviesUseCase = new ListFilteredMoviesUseCase(moviesRepositoryInMemory)
  })

  it("should be able to filter movie", async () => {
    const user = {
      name: 'test user',
      email: 'user@test.com',
      password: '123456'
    }

    const createUser = await createUserUseCase.execute(user)

    await createMoviesUseCase.execute({
      user_id: createUser.id,
      title: 'test title',
      duration: 60,
      summary: 'test summary',
      genre: 'test',
      episode: 'test ep',
      rating: 'test rating',
      watched: false,
      watched_at: new Date,
      release_at: new Date,
    })
    await createMoviesUseCase.execute({
      user_id: createUser.id,
      title: 'test title 1',
      duration: 60,
      summary: 'test summary',
      genre: 'test',
      episode: 'test ep',
      rating: 'test rating',
      watched: false,
      watched_at: new Date,
      release_at: new Date,
    })
    await createMoviesUseCase.execute({
      user_id: createUser.id,
      title: 'test title 2',
      duration: 60,
      summary: 'test summary',
      genre: 'genre',
      episode: 'test ep',
      rating: 'test rating',
      watched: false,
      watched_at: new Date,
      release_at: new Date,
    })

    const listMovies = await listFilteredMoviesUseCase.execute({
      user_id: createUser.id,
      genre: 'test'
    })

    expect(listMovies[0]).toHaveProperty("id")
    expect(listMovies).toHaveLength(2)
  })
})
