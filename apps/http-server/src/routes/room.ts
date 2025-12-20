import { Router } from "express";
import { createRoom } from "../controllers/room-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router: Router = Router();

router.post("/createRoom", authMiddleware, createRoom);

export default router;
