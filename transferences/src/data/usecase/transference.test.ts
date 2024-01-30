import { CrudRepositoryMock } from "../../../test/mocks/repository/repository";
import { TransferenceUsecase } from "./transference";

describe("TransferenceUsecase", () => {
  test("Should thorw an error if userFrom or userTo not exists", async () => {
    const repository = new CrudRepositoryMock<ICustomer>();
    const transactionRepository = new CrudRepositoryMock<ITransference>();
    const transferenceUsecase = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    const response = transferenceUsecase.execute({
      userFrom: "1",
      userTo: "2",
      value: 10,
    });
    expect(response).rejects.toEqual(
      new Error("Usuario remetente não encontrado!")
    );
    repository.items = [
      {
        id: "1",
      } as ICustomer,
    ];
    const transferenceUsecase2 = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    const response2 = transferenceUsecase2.execute({
      userFrom: "1",
      userTo: "2",
      value: 10,
    });
    expect(response2).rejects.toEqual(
      new Error("Usuario receptor não encontrado!")
    );
  });

  test("Should throw if user from has less money than currentTransference", async () => {
    const repository = new CrudRepositoryMock<ICustomer>();
    const transactionRepository = new CrudRepositoryMock<ITransference>();
    const transferenceUsecase = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    repository.items = [
      {
        id: "1",
        balance: 50,
      } as ICustomer,
      {
        id: "2",
        balance: 50,
      } as ICustomer,
    ];
    const response = transferenceUsecase.execute({
      userFrom: "1",
      userTo: "2",
      value: 100,
    });
    expect(response).rejects.toThrow(
      new Error("Valor maior que o saldo atual!")
    );
  });

  test("Should throw if user from and user to are the same", async () => {
    const repository = new CrudRepositoryMock<ICustomer>();
    const transactionRepository = new CrudRepositoryMock<ITransference>();
    const transferenceUsecase = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    repository.items = [
      {
        id: "1",
        balance: 50,
      } as ICustomer,
    ];
    const response = transferenceUsecase.execute({
      userFrom: "1",
      userTo: "1",
      value: 50,
    });
    expect(response).rejects.toThrow(
      new Error("Oss usuarios devem ser diferentes!")
    );
  });

  test("Should throw if value are less or equals zero", async () => {
    const repository = new CrudRepositoryMock<ICustomer>();
    const transactionRepository = new CrudRepositoryMock<ITransference>();
    const transferenceUsecase = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    repository.items = [
      {
        id: "1",
        balance: 50,
      } as ICustomer,
      {
        id: "2",
        balance: 50,
      } as ICustomer,
    ];
    const response = transferenceUsecase.execute({
      userFrom: "1",
      userTo: "2",
      value: 0,
    });
    expect(response).rejects.toThrow(
      new Error("O valor da transferencia deve ser maior que 0!")
    );
  });

  test("Should decrement value to userFrom balance and increment to userTo balance", async () => {
    const repository = new CrudRepositoryMock<ICustomer>();
    const transactionRepository = new CrudRepositoryMock<ITransference>();
    const transferenceUsecase = new TransferenceUsecase(
      repository,
      transactionRepository
    );
    repository.items = [
      {
        id: "1",
        balance: 50,
      } as ICustomer,
      {
        id: "2",
        balance: 50,
      } as ICustomer,
    ];
    const inputValues = {
      userFrom: "1",
      userTo: "2",
      value: 2,
    };
    await transferenceUsecase.execute(inputValues);
    const getById = (id: string) =>
      repository.updateInput.filter((i) => i.id === id)[0];
    expect(getById("2").balance).toEqual(52);
    expect(getById("1").balance).toEqual(48);
  });
});
