import AppError from './app';

export class NotAuthorizedError extends AppError {
  code = 401;

  constructor() {
    super('unauthorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
