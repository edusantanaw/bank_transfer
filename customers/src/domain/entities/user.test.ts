import { UserEntity } from "./user";

describe("user entity", () => {
  test("Should gererate an random uuid id if id is not provided", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      balance: 1,
    }).getUser;
    expect(user.id).not.toBe(undefined);
    expect(user.id).not.toBe(null);
  });
  test("Should use provided id if one is not provided", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    }).getUser;
    expect(user.id).toBe("1");
    expect(user.id).not.toBe(null);
  });
  test("Should change the user password if setPassword method is called", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    });
    user.setPassword = "1234";
    const newUser = user.getUser;
    expect(newUser.password).toBe("1234");
    expect(newUser.password).not.toBe("1");
  });

  test("Should throw if value is greater than current balance", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    });
    const decrementAction = () => user.decrementBalance(2);
    expect(decrementAction).toThrow(
      new Error("Valor maior que o saldo atual!")
    );
  });
  test("Should decrement if value is lower or equals current balance", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    });
    user.decrementBalance(1)
    const currentUser = user.getUser
    expect(currentUser.balance).toBe(0);
  });
  test("Should increment current balance if icrementBalance are called!", () => {
    const user = new UserEntity({
      name: "Eduardo Santana",
      cpfCnpj: "123123123123",
      email: "eduardo@mail.com",
      isShopkeeper: false,
      password: "edu",
      id: "1",
      balance: 1,
    });
    user.icrementBalance(1)
    const currentUser = user.getUser
    expect(currentUser.balance).toBe(2);
  });
});
