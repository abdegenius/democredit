import AppError from './app';

export class ConflictError extends AppError {
  code = 409;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
