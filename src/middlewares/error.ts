import { Request, Response, NextFunction } from "express";
import AppError from "../errors/app";
import { InputValidationError } from "../errors/input-validation";
import { AppResponse } from "../utils/response";

export const errorHandler = () => {
  return async (
    err: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: NextFunction
  ): Promise<Response> => {
    if (err instanceof AppError) {
      const status = err.code;
      const inputErrorMessage = err.message;
      const message =
        (err instanceof InputValidationError && inputErrorMessage) ||
        err.message.toLowerCase();

      return AppResponse.error({ status, res, message });
    }

    return AppResponse.error({
      status: 500,
      res,
      message: "server error",
    });
  };
};
