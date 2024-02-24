import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();

app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes.userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

export default app;