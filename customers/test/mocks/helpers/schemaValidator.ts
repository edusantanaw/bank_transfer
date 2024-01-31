import { IUser } from "../../../src/@types/user";
import { SchemaValidator } from "../../../src/presentational/validation/schemaValidator";

export class IUserSchemaValidator implements SchemaValidator<Omit<IUser, "id">> {
  errors: string[] = [];
  input: Omit<IUser, "id"> | null = null;
  validSchema(data: Omit<IUser, "id">): string[] {
    this.input = data;
    return this.errors;
  }
}
