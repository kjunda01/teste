import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserPasswordController,
  signOutController,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);
router.post("/resetpasswordforemail", resetPasswordForEmailController);
router.post("/updateuserpassword", updateUserPasswordController);
router.post("/signout", signOutController);

// Rotas protegidas (exigem autenticação)

export default router;
