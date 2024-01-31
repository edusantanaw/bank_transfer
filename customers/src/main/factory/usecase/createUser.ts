import { EncrypterMock } from "../../../../test/mocks/helpers/ecrypter";
import { CreateUserUsecase } from "../../../data/usecases/createUser";
import { UserRepository } from "../../../infra/repositories/user.repository";

export function createUserUsecaseFactory() {
  return new CreateUserUsecase(new UserRepository(), new EncrypterMock("hash"));
}
