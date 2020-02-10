import { Router } from "express";
import * as authController from "@src/controllers/api/auth.controller";
// ----------------
// Middlewares
import isEmailTaken from "@src/middlewares/isEmailTaken";

const router = Router();

router.post("/login", authController.postLogin);

router.post("/logout", authController.postlogout);

router.post("/new-pwd", authController.postNewPwd);

router.post("/reset-pwd", authController.postResetPwd);

router.post("/verify-email", authController.postVerifyEmail);

router.post("/sivler-signup", isEmailTaken, authController.postSilverSignup);

router.post("/gold-signup", isEmailTaken, authController.postGoldSignup);

export default router;
