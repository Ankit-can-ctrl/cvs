import express from "express";
import authRouter from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/room", roomRouter);

app.listen(3001, () => console.log("Http-server running on port:3001"));
