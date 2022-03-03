import { Router } from "express";
import { ListAllMoviesController } from "../../../modules/movies/useCase/listAllMovies/ListAllMoviesController";
import { CreateMoviesController } from "../../../modules/movies/useCase/createMovies/CreateMoviesController";
import { UpdateMoviesController } from "../../../modules/movies/useCase/updateMovies/UpdateMoviesController";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const moviesRoutes = Router();

const createMoviesController = new CreateMoviesController();
const listAllMoviesController = new ListAllMoviesController();
const updateMoviesController = new UpdateMoviesController();

moviesRoutes.post("/", verifyAuthentication, createMoviesController.handle);
moviesRoutes.get("/", verifyAuthentication, listAllMoviesController.handle);
moviesRoutes.put("/update", verifyAuthentication, updateMoviesController.handle);

export { moviesRoutes }
