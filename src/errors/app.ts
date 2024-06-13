export abstract class AppError extends Error {
  abstract code: number;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export default AppError;
