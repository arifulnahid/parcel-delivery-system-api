import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Parcel Delivery System Backend",
  });
});

app.use("/api", router);

export default app;
