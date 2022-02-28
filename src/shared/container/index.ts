import { container } from "tsyringe";

import "./providers";
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokenRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersTokenRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IMoviesRepository } from "../../modules/movies/repositories/IMoviesRepository";
import { MoviesRepository } from "../../modules/movies/infra/typeorm/repositories/MoviesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);

container.registerSingleton<IMoviesRepository>(
  "MoviesRepository",
  MoviesRepository
);
