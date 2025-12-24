import "dotenv/config";
import cors from "cors";
import express from "express";
import authRouter from "./routes/auth.js";
import roomRouter from "./routes/room.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);

app.listen(3001, () => console.log("Http-server is now running on port:3001"));
