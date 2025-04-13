import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

import resetPasswordForEmailController from "../controllers/auth/resetPasswordForEmailController.js";
import setSessionController from "../controllers/auth/setSessionController.js";
import signInWithPasswordController from "../controllers/auth/signInWithPasswordController.js";
import signOutController from "../controllers/auth/signOutController.js";
import signUpController from "../controllers/auth/signUpController.js";
import updateUserPasswordController from "../controllers/auth/updateUserPasswordController.js";

dotenv.config();

const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/signup", signUpController);
router.post("/signinwithpassword", signInWithPasswordController);
router.post("/resetpasswordforemail", resetPasswordForEmailController);
router.post("/signout", signOutController);


// Rotas protegidas (exigem autenticação)
router.post("/setsession", setSessionController);
router.post("/updateuserpassword", updateUserPasswordController);

export default router;
