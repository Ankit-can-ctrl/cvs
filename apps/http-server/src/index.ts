import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());

console.log("Registering auth routes...");
app.use("/api/v1/auth", authRouter);
console.log("Auth routes registered!");
// app.use("/room", roomRouter);

app.listen(3001, () => console.log("Http-server is now running on port:3001"));
