import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

const app: Express = express();

app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;