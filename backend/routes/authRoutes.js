import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserController,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);

// Rotas protegidas (exigem autenticação)
router.post("/resetpasswordforemail", authMiddleware, resetPasswordForEmailController);
router.post("/updateuser", authMiddleware, updateUserController);

export default router;
