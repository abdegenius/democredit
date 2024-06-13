import AppError from './app';

export class BadRequestError extends AppError {
  code = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
