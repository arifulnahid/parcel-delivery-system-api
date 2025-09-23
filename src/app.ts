import express, { Request, Response } from "express";
import { router } from "./routes";
import passport from "passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { jwtStrategy, localStrategy } from "./config/passport";
import { envVars } from "./config/env";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
