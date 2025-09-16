import express, { Request, Response } from "express";
import { Server } from "http";
import { app } from "./app";

const PORT = 5100;

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
