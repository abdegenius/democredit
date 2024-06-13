import AppError from './app';

export class InputValidationError extends AppError {
  code = 422;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, InputValidationError.prototype);
  }
}
