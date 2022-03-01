import { Router } from "express";
import { ListAllMoviesController } from "../../../modules/movies/useCase/listAllMovies/ListAllMoviesController";
import { CreateMoviesController } from "../../../modules/movies/useCase/createMovies/CreateMoviesController";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const moviesRoutes = Router();

const createMoviesController = new CreateMoviesController();
const listAllMoviesController = new ListAllMoviesController();

moviesRoutes.post("/", verifyAuthentication, createMoviesController.handle);
moviesRoutes.get("/", verifyAuthentication, listAllMoviesController.handle);

export { moviesRoutes }
