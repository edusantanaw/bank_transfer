function HttpStatus<T>(code: number, body: T) {
  return {
    statusCode: code,
    body: body,
  };
}

function CatchError(error: unknown) {
  const { message } = error as Error;
  return HttpStatus(400, message);
}

const BadRequest = <T>(body: T) => HttpStatus(400, body);

const Ok = <T>(body: T) => HttpStatus(200, body);

export { BadRequest, HttpStatus, CatchError, Ok };
