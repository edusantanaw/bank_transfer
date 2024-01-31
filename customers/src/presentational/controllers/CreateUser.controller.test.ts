import { IUser } from "../../@types/user";
import { IUserSchemaValidator } from "../../test/mocks/helpers/schemaValidator";
import { UsecaseMock } from "../../test/mocks/usecase/genericUsecase";
import { CreateUserController } from "./createUser.controller";

describe("CreateUserController", () => {
  test("Should return bad request if user schema is invalid!", async () => {
    const errors = ["email invalido!"];
    const createUserUsecase = new UsecaseMock<Omit<IUser, "id">, IUser>();
    const schemaValidator = new IUserSchemaValidator();
    schemaValidator.errors = errors;
    const createUserController = new CreateUserController(
      schemaValidator,
      createUserUsecase
    );
    const response = await createUserController.handle({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardomail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response.body).toEqual(errors);
    expect(response.statusCode).toBe(400);
  });

  test("Should return bad request if usecase throws an domain error", async () => {
    const createUserUsecase = new UsecaseMock<Omit<IUser, "id">, IUser>();
    createUserUsecase.expectedError = true;
    const schemaValidator = new IUserSchemaValidator();
    const createUserController = new CreateUserController(
      schemaValidator,
      createUserUsecase
    );
    const response = await createUserController.handle({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe("Error");
  });

  test("Should return bad request if usecase throws an server error", async () => {
    const createUserUsecase = new UsecaseMock<Omit<IUser, "id">, IUser>();
    createUserUsecase.serverError = true;
    const schemaValidator = new IUserSchemaValidator();
    const createUserController = new CreateUserController(
      schemaValidator,
      createUserUsecase
    );
    const response = await createUserController.handle({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe("Internal Server Error!");
  });

  test("Should return an new user if is created succefuly!", async () => {
    const output = {
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    };
    const createUserUsecase = new UsecaseMock<Omit<IUser, "id">, IUser>();
    createUserUsecase.output = output;
    const schemaValidator = new IUserSchemaValidator();
    const createUserController = new CreateUserController(
      schemaValidator,
      createUserUsecase
    );
    const response = await createUserController.handle(
      output as Omit<IUser, "id">
    );
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(output);
  });
});
