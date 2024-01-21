function HttpStatus<T>(status: number | string, body: T): HttpResponse {
  return {
    statusCode: status,
    body,
  };
}

const Ok = <T>(body: T) => HttpStatus(200, body);
const Created = <T>(body: T) => HttpStatus(201, body);
const BadRequest = <T>(body: T) => HttpStatus(400, body);
const ServerCaptureError = () => HttpStatus(500, "Internal Server Error!");

export { HttpStatus, Ok, Created, BadRequest, ServerCaptureError };
