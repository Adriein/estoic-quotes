import { CustomError } from './CustomError';

export class AlreadyExists extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AlreadyExists.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
