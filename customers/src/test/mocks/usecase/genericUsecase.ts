import { AlreadyExistsError } from "../../../helpers/errors/AlreadyExists.errors";

export class UsecaseMock<In, Out> {
  serverError: boolean = false;
  expectedError: boolean = false;
  input: In | null = null;
  output: Out | null = null;
  async execute(data: In) {
    this.input = data;
    if (this.expectedError) throw new AlreadyExistsError("Error");
    if (this.serverError) throw new ServerError("Sever error");
    return this.output ?? ({} as Out);
  }
}
