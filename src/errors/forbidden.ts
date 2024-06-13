import AppError from './app';

export class ForbiddenError extends AppError {
  code = 403;

  constructor() {
    super('forbidden');

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
