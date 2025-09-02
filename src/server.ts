import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./config/env";

let server: Server;
// const PORT: number = envVars.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URI);

    console.log("Connected to DB!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
