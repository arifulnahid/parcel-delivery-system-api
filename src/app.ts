import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { router } from "./routes";
import { envVars } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Parcel Delivery System Backend",
  });
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
