import { IUser } from "../../@types/user";
import { AlreadyExistsError } from "../../helpers/errors/AlreadyExists.errors";
import { EncrypterMock } from "../../test/mocks/helpers/ecrypter";
import { UserRepository } from "../../test/mocks/repository/user.repository";
import { CreateUserUsecase } from "./createUser";

function makeSut() {
  const userRepository = new UserRepository();
  const encrypter = new EncrypterMock("hash");
  const createUserUsecase = new CreateUserUsecase(userRepository, encrypter);
  return {
    createUserUsecase,
    encrypter,
    userRepository,
  };
}

describe("CreateUserUsecase", () => {
  test("Should throw if cpf already in use by outher user", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    userRepository.items = [
      {
        name: "Eduardo Santana",
        cpfCnpj: "123123123123",
        email: "eduardo@mail.com",
        isShopkeeper: false,
        password: "edu",
        balance: 1,
        id: "1",
      },
    ];
    const response = createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response).rejects.toThrow(
      new AlreadyExistsError("Cpf já está sendo usado!")
    );
  });

  test("Should throw if email already in use by outher user", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    userRepository.items = [
      {
        name: "Eduardo Santana",
        cpfCnpj: "123123123123",
        email: "eduardo@mail.com",
        isShopkeeper: false,
        password: "edu",
        balance: 1,
        id: "1",
      },
    ];
    const response = createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "1231231321323123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response).rejects.toThrow(
      new AlreadyExistsError("Email já está sendo usado!")
    );
  });

  test("Should call userRepository methods with correct values", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123432423",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(userRepository.loadByEmailInput).toBe("eduardo@mail.com");
    expect(userRepository.loadByCpfCnpjInput).toBe("123123123123432423");
  });

  test("Should call encrypter method with correct value", async () => {
    const { createUserUsecase, encrypter } = makeSut();
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123432423",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(encrypter.generatehashInput).toBe("edu");
  });

  test("Should replace user password with encrypter return", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    await createUserUsecase.execute({
      name: "Eduardo Santana",
      cpfCnpj: "1231231231233214",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(userRepository.createInput[0].password).toBe("hash");
  });

  test("Should call userRepository.create with user payload", async () => {
    const { createUserUsecase, userRepository } = makeSut();
    const data: IUser = {
      name: "Eduardo Santana",
      cpfCnpj: "1231231231234332",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
      id: "1",
    };
    await createUserUsecase.execute(data);
    expect(userRepository.createInput[0]).toEqual({
      ...data,
      password: "hash",
    });
  });

  test("Should return an new user without password in the payload", async () => {
    const { createUserUsecase } = makeSut();
    const data: IUser = {
      name: "Eduardo Santana",
      cpfCnpj: "52800431230122870",
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
