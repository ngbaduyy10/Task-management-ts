import { Router } from "express";
const router: Router = Router();
import * as userController from "../controllers/user.controller";

router.post("/register", userController.register);

router.post("/login", userController.login);

export const userRoutes: Router = router;