import AppError from './app';

export class NotFoundError extends AppError {
  code = 404;

  constructor(public message = 'not found') {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
