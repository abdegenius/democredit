import express, { Response, NextFunction } from "express";
import { Server } from "http";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import logger from "loglevel";
import routes from "./routes";

import helmet from "helmet";
import { errorHandler } from "./middlewares/error";
import { AppResponse } from "./utils/response";

dotenv.config();

export const app: express.Application = express();

const DEFAULT_PORT = process.env.PORT || "7000";

async function startServer(port = DEFAULT_PORT): Promise<Server> {
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use((_, res: Response, next: NextFunction): void => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, access-token");
    next();
  });

  if (process.env.ENV !== "prod") {
    app.use(morgan("tiny"));
  }

  app.use(cors());
  app.use(helmet());

  app.use("/", routes);

  app.all("*", async (_req, res) => {
    return AppResponse.error({
      status: 404,
      res,
      message: "not found",
    });
  });

  app.use(errorHandler);

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${port}`);
      const originalClose = server.close.bind(server);
      server.close = (): Server => {
        return originalClose();
      };
      resolve(server);
    });
  });
}

export default startServer;
