import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { MoviesRepositoryInMemory } from "../../repositories/in-memory/MoviesRepositoryInMemory";
import { CreateUserUseCase } from "../../../accounts/useCase/createUser/CreateUserUseCase";
import { CreateMoviesUseCase } from "../createMovies/CreateMoviesUseCase";
import { UpdateMoviesUseCase } from "./UpdateMoviesUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let moviesRepositoryInMemory: MoviesRepositoryInMemory
let createMoviesUseCase: CreateMoviesUseCase
let createUserUseCase: CreateUserUseCase
let updateMoviesUseCase: UpdateMoviesUseCase

describe("Update Movies", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    moviesRepositoryInMemory = new MoviesRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    createMoviesUseCase = new CreateMoviesUseCase(moviesRepositoryInMemory)
    updateMoviesUseCase = new UpdateMoviesUseCase(moviesRepositoryInMemory)
  })

  it("should be able to update movie", async () => {
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

    const updatedMovie = await updateMoviesUseCase.execute({
      user_id: createUser.id,
      movie_id: createMovie.id,
      title: 'test title',
      watched: true,
    })

    expect(updatedMovie.id).toEqual(createMovie.id)
    expect(updatedMovie.watched).toEqual(true)
  })

  it("should not be able to update movie if not exist movie id", async () => {
    expect(async () => {
      const user = {
        name: 'test user',
        email: 'user@test.com',
        password: '123456'
      }

      const createUser = await createUserUseCase.execute(user)

      await updateMoviesUseCase.execute({
        user_id: createUser.id,
        movie_id: 'invalid-movie-id',
        title: 'test title',
        watched: true,
      })
    }).rejects.toEqual(new AppError("Movie not exists"))
  })
})
