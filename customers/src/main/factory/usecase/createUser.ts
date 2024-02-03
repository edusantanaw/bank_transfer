import { CreateUserUsecase } from "../../../data/usecases/createUser";
import { Encrypter } from "../../../helpers/encrypter/encrypter";
import { UserRepository } from "../../../infra/repositories/user.repository";

export function createUserUsecaseFactory() {
  return new CreateUserUsecase(new UserRepository(), new Encrypter());
}
