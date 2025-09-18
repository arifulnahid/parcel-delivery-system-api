import { Server } from "http";
import app from "./app";
import { envVars } from "./config/env";
import mongoose from "mongoose";

const PORT = envVars.PORT;

let server: Server;

const startServer = async () => {
  try {
    // Database Connection
    console.log("Connecting to DB...");
    await mongoose.connect(envVars.DB_URI);
    console.log("Connected to DB!");

    // Server Listening
    server = app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
