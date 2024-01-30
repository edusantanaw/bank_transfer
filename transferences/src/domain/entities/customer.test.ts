import { CustomerEntity } from "./customer";

describe("user entity", () => {
  test("Should gererate an random uuid id if id is not provided", () => {
    const user = new CustomerEntity({
      cpfCnpj: "123123123123",
      isShopkeeper: false,
      balance: 1,
    }).getCustomer;
    expect(user.id).not.toBe(undefined);
    expect(user.id).not.toBe(null);
  });
  test("Should use provided id if one is not provided", () => {
    const user = new CustomerEntity({
      cpfCnpj: "123123123123",
      isShopkeeper: false,
      id: "1",
      balance: 1,
    }).getCustomer;
    expect(user.id).toBe("1");
    expect(user.id).not.toBe(null);
  });

  test("Should throw if value is greater than current balance", () => {
    const user = new CustomerEntity({
      cpfCnpj: "123123123123",
      isShopkeeper: false,
      id: "1",
      balance: 1,
    });
    const decrementAction = () => user.decrementBalance(2);
    expect(decrementAction).toThrow(
      new Error("Valor maior que o saldo atual!")
    );
  });
  test("Should decrement if value is lower or equals current balance", () => {
    const user = new CustomerEntity({
      cpfCnpj: "123123123123",
      isShopkeeper: false,
      id: "1",
      balance: 1,
    });
    user.decrementBalance(1);
    const currentUser = user.getCustomer;
    expect(currentUser.balance).toBe(0);
  });
  test("Should increment current balance if icrementBalance are called!", () => {
    const user = new CustomerEntity({
      cpfCnpj: "123123123123",
      isShopkeeper: false,
      id: "1",
      balance: 1,
    });
    user.icrementBalance(1);
    const currentUser = user.getCustomer;
    expect(currentUser.balance).toBe(2);
  });
});
