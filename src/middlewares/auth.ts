/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized";
import { verifyJwtToken } from "../utils/crypto";

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
    }
  }
}

export const authHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  if (typeof authorizationHeader !== "string") {
    throw new NotAuthorizedError();
  } else {
    try {
      const accessToken = authorizationHeader.split(" ")[1];
      const data = await (<Promise<{ id: string }>>(
        verifyJwtToken(accessToken, process.env.JWT_SECRET_KEY as string)
      ));

      req.user_id = data.id;

      next();
    } catch (err) {
      throw new NotAuthorizedError();
    }
  }
};
