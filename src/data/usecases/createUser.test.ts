import { EncrypterMock } from "../../test/mocks/helpers/ecrypter";
import { UserRepository } from "../../test/mocks/repository/user.repository";
import { CreateUserUsecase } from "./createUser";

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
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
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
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
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

  test("Should call userRepository methods with correct values", async () => {
    const userRepository = new UserRepository();
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(userRepository.loadByEmailInput).toBe("eduardo@mail.com");
    expect(userRepository.loadByCpfCnpjInput).toBe("528000122870");
  });

  test("Should call encrypter method with correct value", async () => {
    const userRepository = new UserRepository();
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(encrypter.generatehashInput).toBe("edu");
  });

  test("Should replace user password with encrypter return", async () => {
    const userRepository = new UserRepository();
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(userRepository.createInput?.password).toBe("hash");
  });

  test("Should call userRepository.create with user payload", async () => {
    const userRepository = new UserRepository();
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
    const data: IUser = {
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
      id: "1",
    };
    await createUserUsecase.execute(data);
    expect(userRepository.createInput).toEqual({ ...data, password: "hash" });
  });

  test("Should return an new user without password in the payload", async () => {
    const userRepository = new UserRepository();
    const encrypter = new EncrypterMock("hash");
    const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
    const data: IUser = {
      name: "Eduardo Santana",
      cpfCnpj: "528000122870",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
      id: "1",
    };
    const { password, ...rest } = data;
    const res = await createUserUsecase.execute(data);
    expect(res).toEqual(rest);
  });
});
