import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import env from "./config/env";
import logger from "./config/logger";
import errorMiddleware from "./middlewares/error.middleware";
import routes from "./routes";
import { checkDB } from "./db";

export default async function startApplication(app: Application) {
  app = express();
  const port = env.port;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(logger.logan);

  await checkDB();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: true,
      message: "API running as expected",
    });
  });

  app.use("/api", routes);

  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ status: false, message: "Page not found" });
  });

  app.use(errorMiddleware);

  app.listen(port, () => {
    logger.log(`${env.app_name} running on port ${port}`);
  });
}
