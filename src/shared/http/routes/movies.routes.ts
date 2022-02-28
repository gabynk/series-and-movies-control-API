import { Router } from "express";
import { CreateMoviesController } from "../../../modules/movies/useCase/createMovies/CreateMoviesController";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const moviesRoutes = Router();

const createMoviesController = new CreateMoviesController();

moviesRoutes.post("/", verifyAuthentication, createMoviesController.handle);

export { moviesRoutes }
