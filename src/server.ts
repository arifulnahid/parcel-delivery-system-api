import express, { Request, Response } from "express";
import { Server } from "http";

const app = express();
const PORT = 5100;

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

const server: Server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
