import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserController,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Rotas abertas (sem autenticação)
router.get("/", (res) => {res.redirect(process.env.FRONTEND_URL)});
router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);

// Rotas protegidas (exigem autenticação)
router.post("/resetpasswordforemail", authMiddleware, resetPasswordForEmailController);
router.post("/updateuser", authMiddleware, updateUserController);

export default router;
