import { Router } from "express";
import * as authController from "@src/controllers/api/auth.controller";

const router = Router();

router.post("/login", authController.postLogin);

router.post("/logout", authController.postlogout);

router.post("/sivler-signup", authController.postSilverSignup);

router.post("/gold-signup", authController.postGoldSignup);

export default router;
