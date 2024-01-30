import { Transference } from "./transference";

describe("transference", () => {
  test("Should craete an random id or date if respectives are not provided", () => {
    const transference = new Transference({
      from: "1",
      to: "2",
      value: 2000,
    }).getTransference;
    expect(transference.id).not.toBe(null);
    expect(transference.date).not.toBe(undefined);
  });

  test("Should craete an random id or date if respectives are not provided", () => {
    const transference = new Transference({
      from: "1",
      to: "2",
      value: 2000,
    }).getTransference;
    expect(transference.id).not.toBe(null);
    expect(transference.date).not.toBe(null);
  });

  test("Should use provided id and date if respectives are provided", () => {
    const date = new Date();
    const transference = new Transference({
      from: "1",
      to: "2",
      value: 2000,
      date: date,
      id: "1",
    }).getTransference;
    expect(transference.id).toBe("1");
    expect(transference.date).toBe(date);
  });

  test("should throw if from and to are the same", () => {
    const createtransference = () =>
      new Transference({
        from: "2",
        to: "2",
        value: 2000,
      });
    expect(createtransference).toThrow(
      new Error("Oss usuarios devem ser diferentes!")
    );
  });
  test("should throw if value are lower or equals than 0 ", () => {
    const createtransference = () =>
      new Transference({
        from: "1",
        to: "2",
        value: 0,
      });
    expect(createtransference).toThrow(
      new Error("O valor da transferencia deve ser maior que 0!")
    );
  });
});
