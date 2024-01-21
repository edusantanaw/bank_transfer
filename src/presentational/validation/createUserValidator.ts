import { SchemaValidator } from "./schemaValidator";

type data = Omit<IUser, "id">;

export class CreateUserValidator extends SchemaValidator<data> {
  private errors: string[] = [];

  constructor(
    private readonly emailValidator: IValidator,
    private readonly cpfValidator: IValidator,
    private readonly cnpjValidotor: IValidator
  ) {
    super();
  }

  override validSchema(data: data): string[] {
    if (!data.name || data.name.trim() === data.name)
      this.errors.push("O nome é invalido!");
    if (!this.emailValidator.isValid(data.email))
      this.errors.push("O email é invalido!");
    if (
      this.cpfValidator.isValid(data.cpfCnpj) &&
      this.cnpjValidotor.isValid(data.cpfCnpj)
    )
      this.errors.push("O cpfCnpj é invalido!");
    if (data.password.length < 6)
      this.errors.push("A senha deve conter pelo menos 6 caracteres!");
    return this.errors;
  }
}
