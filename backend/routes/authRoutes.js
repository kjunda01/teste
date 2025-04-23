import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

// import dos middlewares
import emailValidationMiddleware from "../middlewares/auth/emailValidationMiddleware.js";
import passwordValidationMiddleware from "../middlewares/auth/passwordValidationMiddleware.js";
import userExistsMiddleware from "../middlewares/auth/userExistsMiddleware.js";

// import dos controllers
import resetPasswordForEmailController from "../controllers/auth/resetPasswordForEmailController.js";
import setSessionController from "../controllers/auth/setSessionController.js";
import signInWithPasswordController from "../controllers/auth/signInWithPasswordController.js";
import signOutController from "../controllers/auth/signOutController.js";
import signUpController from "../controllers/auth/signUpController.js";
import updateUserPasswordController from "../controllers/auth/updateUserPasswordController.js";
import errorHandler from "../middlewares/errorHandler.js";

dotenv.config();

const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/signinwithpassword", emailValidationMiddleware, passwordValidationMiddleware, signInWithPasswordController);
router.post("/signup", emailValidationMiddleware, passwordValidationMiddleware, userExistsMiddleware, signUpController);
router.post("/resetpasswordforemail", emailValidationMiddleware, userExistsMiddleware, resetPasswordForEmailController);
router.post("/signout", signOutController);

// Rotas protegidas (exigem autenticação)
router.post("/setsession", setSessionController);
router.post("/updateuserpassword", updateUserPasswordController);

export default router;
