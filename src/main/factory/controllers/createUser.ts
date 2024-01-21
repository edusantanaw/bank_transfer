import { CreateUserController } from "../../../presentational/controllers/createUser.controller";
import { createUserUsecaseFactory } from "../usecase/createUser";
import { createUserValidatorFactory } from "../validators/userValidator";

export function createUserControllerFactory() {
  return new CreateUserController(
    createUserValidatorFactory(),
    createUserUsecaseFactory()
  );
}
