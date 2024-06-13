import express from "express";
import { Send } from "express-serve-static-core";

export interface IResponse<T> extends express.Response {
  json: Send<T, this>;
}

interface IResponsePayload<T> {
  res: express.Response;
  status: number;
  data: T | null;
  message?: string;
}

const sendResponse = <T>({
  res,
  status,
  data,
  message,
}: IResponsePayload<T>): IResponse<T> => {
  const success = status >= 200 && status < 300;

  const body = {
    error: !success,
    status: success ? "successful" : "error",
    data,
    message,
  };

  return res.status(status).json(body);
};

export class AppResponse {
  static ok<T>({ res, data }: Omit<IResponsePayload<T>, "status">) {
    return sendResponse({
      res,
      status: 200,
      data,
    });
  }

  static created<T>({ res, data }: Omit<IResponsePayload<T>, "status">) {
    return sendResponse({
      res,
      status: 201,
      data,
    });
  }

  static error({
    res,
    status,
    message,
  }: Omit<IResponsePayload<null>, "data"> & { message: string }) {
    return sendResponse({
      res,
      status,
      data: null,
      message,
    });
  }
}
