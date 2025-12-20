import { Router } from "express";
import { signup, signin } from "../controllers/user-controller.js";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
