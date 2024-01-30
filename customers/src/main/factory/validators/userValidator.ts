import { CnpjValidator } from "../../../presentational/validation/cnpjValidator";
import { CpfValidator } from "../../../presentational/validation/cpfValidator";
import { CreateUserValidator } from "../../../presentational/validation/createUserValidator";
import { EmailValidator } from "../../../presentational/validation/emailValidator";

export function createUserValidatorFactory() {
  return new CreateUserValidator(
    new EmailValidator(),
    new CpfValidator(),
    new CnpjValidator()
  );
}
