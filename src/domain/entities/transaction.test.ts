import { Transaction } from "./transaction";

describe("transaction", () => {
  test("Should craete an random id or date if respectives are not provided", () => {
    const transaction = new Transaction({
      from: "1",
      to: "2",
      value: 2000,
    }).getTransaction;
    expect(transaction.id).not.toBe(null);
    expect(transaction.id).not.toBe(undefined);
    expect(transaction.date).not.toBe(undefined);
    expect(transaction.date).not.toBe(null);
  });

  test("Should craete an random id or date if respectives are not provided", () => {
    const transaction = new Transaction({
      from: "1",
      to: "2",
      value: 2000,
    }).getTransaction;
    expect(transaction.id).not.toBe(null);
    expect(transaction.id).not.toBe(undefined);
    expect(transaction.date).not.toBe(undefined);
    expect(transaction.date).not.toBe(null);
  });

  test("Should use provided id and date if respectives are provided", () => {
    const date = new Date();
    const transaction = new Transaction({
      from: "1",
      to: "2",
      value: 2000,
      date: date,
      id: "1",
    }).getTransaction;
    expect(transaction.id).toBe("1");
    expect(transaction.date).toBe(date);
  });

  test("should throw if from and to are the same", () => {
    const createTransaction = () =>
      new Transaction({
        from: "2",
        to: "2",
        value: 2000,
      });
      expect(createTransaction).toThrow(new Error("Oss usuarios devem ser diferentes!"))
  });
  test("should throw if value are lower or equals than 0 ", () => {
    const createTransaction = () =>
      new Transaction({
        from: "1",
        to: "2",
        value: 0,
      });
      expect(createTransaction).toThrow(new Error("O valor da transferencia deve ser maior que 0!"))
  });
});
