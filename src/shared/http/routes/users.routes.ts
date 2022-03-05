import { Router } from "express";
import { UpdateUserController } from "../../../modules/accounts/useCase/updateUser/UpdateUserController";
import { CreateUserController } from "../../../modules/accounts/useCase/createUser/CreateUserController";
import { verifyAuthentication } from "../middlewares/verifyAuthentication";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/update", verifyAuthentication, updateUserController.handle);

export { usersRoutes };
