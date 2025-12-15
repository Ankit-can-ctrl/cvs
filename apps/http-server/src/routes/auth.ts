import { Router } from "express";
import { signin, signup } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router: Router = Router();

router.post("/signup", authMiddleware, signup);
router.post("/signin", authMiddleware, signin);

export default router;
