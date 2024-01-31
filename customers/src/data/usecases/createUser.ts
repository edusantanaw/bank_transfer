import { IUser } from "../../@types/user";
import { UserEntity } from "../../domain/entities/user";
import { ICreateUsecase } from "../../domain/usecases/create.interface";
import { AlreadyExistsError } from "../../helpers/errors/AlreadyExists.errors";
import { IEncrypter } from "../interfaces/helpers/encrypter.interface";
import { ICreateUserRepository } from "../interfaces/repository/createUser.interface";

interface ICreateUserData extends Omit<IUser, "id"> {
  id?: string;
}

export class CreateUserUsecase
  implements ICreateUsecase<ICreateUserData, Omit<IUser, "password">>
{
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly encrypter: IEncrypter
  ) {}

  public async execute(
    data: ICreateUserData
  ): Promise<Omit<IUser, "password">> {
    const [userByCpfCnpj, userByEmail] = await Promise.all([
      this.userRepository.loadByCpfCnpj(data.cpfCnpj),
      this.userRepository.loadByEmail(data.email),
    ]);
    if (userByCpfCnpj) throw new AlreadyExistsError("Cpf já está sendo usado!");
    if (userByEmail) throw new AlreadyExistsError("Email já está sendo usado!");
    const user = new UserEntity(data);
    const hashedPassword = await this.encrypter.generatehash(user.getPassword);
    user.setPassword = hashedPassword;
    const { password: _, ...rest } = await this.userRepository.create(
      user.getUser
    );
    return rest;
  }
}
