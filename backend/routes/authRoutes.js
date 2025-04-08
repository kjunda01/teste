import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserPasswordController,
  signOutController,
  setSessionController,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);
router.post("/resetpasswordforemail", resetPasswordForEmailController);
router.post("/signout", signOutController);
router.post("/setsession", setSessionController);

// Rotas protegidas (exigem autenticação)
router.post("/updateuserpassword", authMiddleware, updateUserPasswordController);


export default router;
