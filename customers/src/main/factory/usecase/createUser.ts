import { CreateUserUsecase } from "../../../data/usecases/createUser";
import { EncrypterMock } from "../../../test/mocks/helpers/ecrypter";
import { UserRepository } from "../../../test/mocks/repository/user.repository";

export function createUserUsecaseFactory() {
  return new CreateUserUsecase(new UserRepository(), new EncrypterMock("hash"));
}
