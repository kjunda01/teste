import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserController,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", authMiddleware, signUpController);
router.post("/signinwithpassword", authMiddleware, signInWithPasswordController);
router.post("/resetpasswordforemail", authMiddleware, resetPasswordForEmailController);
router.post("/updateuser", authMiddleware, updateUserController);

export default router;
