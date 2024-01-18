
export abstract class SchemaValidator<T> {
  abstract validSchema(data: T): string[];
}

