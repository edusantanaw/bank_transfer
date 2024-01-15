import { ICreateUsecase } from "../../domain/usecases/create.interface";
import { UserRepository } from "../../test/mocks/repository/user.repository";

interface ICreateUserData extends Omit<IUser, "id"> {
  id?: string;
}

interface ICreateRepository<T> {
  create: (data: T) => Promise<T>;
}

interface ICreateUserRepository extends ICreateRepository<IUser> {
  loadByEmail: (email: string) => Promise<IUser | undefined | null>;
  loadByCpfCnpj: (cpfCnpj: string) => Promise<IUser | undefined | null>;
}

export class CreateUserUsecase
  implements ICreateUsecase<ICreateUserData, IUser>
{
  constructor(private readonly userRepository: ICreateUserRepository) {}

  public async execute(data: ICreateUserData): Promise<IUser> {
    const [userByCpfCnpj, userByEmail] = await Promise.all([
      this.userRepository.loadByCpfCnpj(data.cpfCnpj),
      this.userRepository.loadByEmail(data.email),
    ]);
    if (userByCpfCnpj) throw new Error('Cpf já está sendo usado!');
    if (userByEmail) throw new Error('Email já está sendo usado!');
    throw new Error("Not implemented!");
  }
}

describe("CreateUserUsecase", () => {
  test("Should throw if cpf already in use by outher user", async () => {
    const userRepository = new UserRepository();
    userRepository.items = [
      {
        name: "Eduardo Santana",
        cpfCnpj: "52800012870",
        email: "eduardo@mail.com",
        isShopkeeper: false,
        password: "edu",
        balance: 1,
        id: "1",
      },
    ];
    const createUserUsecase = new CreateUserUsecase(userRepository);
    const response = createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "52800012870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response).rejects.toThrow(new Error("Cpf já está sendo usado!"));
  });

  test("Should throw if email already in use by outher user", async () => {
    const userRepository = new UserRepository();
    userRepository.items = [
      {
        name: "Eduardo Santana",
        cpfCnpj: "52800012870",
        email: "eduardo@mail.com",
        isShopkeeper: false,
        password: "edu",
        balance: 1,
        id: "1",
      },
    ];
    const createUserUsecase = new CreateUserUsecase(userRepository);
    const response = createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response).rejects.toThrow(new Error("Email já está sendo usado!"));
  });
});
