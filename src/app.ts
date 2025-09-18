import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

app.use("/api", router);

export default app;
