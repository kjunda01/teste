import express from "express";
import {
  signUpController,
  signInWithPasswordController,
  resetPasswordForEmailController,
  updateUserController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);
router.post("/resetpasswordforemail", resetPasswordForEmailController);
router.post("/updateuser", updateUserController);

export default router;
