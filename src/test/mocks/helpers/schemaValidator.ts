import { SchemaValidator } from "../../../presentational/validation/schemaValidator";

export class IUserSchemaValidator implements SchemaValidator<Omit<IUser, "id">> {
  errors: string[] = [];
  input: Omit<IUser, "id"> | null = null;
  validSchema(data: Omit<IUser, "id">): string[] {
    this.input = data;
    return this.errors;
  }
}
