import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import {
  getMe,
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUserController);

router.post("/login", loginValidator, loginUserController);

router.post("/refresh", refreshUserController);

router.get("/me", authenticate, getMe);

router.post("/logout", authenticate, logoutUserController);

export default router;
