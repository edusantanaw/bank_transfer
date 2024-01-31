import { EncrypterMock } from "../../../../test/mocks/helpers/ecrypter";
import { UserRepository } from "../../../../test/mocks/repository/user.repository";
import { CreateUserUsecase } from "../../../data/usecases/createUser";

export function createUserUsecaseFactory() {
  return new CreateUserUsecase(new UserRepository(), new EncrypterMock("hash"));
}
