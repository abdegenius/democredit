import logger from "loglevel";
import startServer, { app } from "./start";
const notDev = process.env.NODE_ENV !== "dev";
const logLevel = notDev ? "info" : "warn";

// sets global logger for the app
logger.setLevel(logLevel);

// starts express server
startServer().then(async () => {
  try {
  } catch (error) {}
});

export default app;
