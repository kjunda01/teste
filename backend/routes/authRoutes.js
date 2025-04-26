import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";

// import dos middlewares
import emailValidationMiddleware from "../middlewares/auth/emailValidationMiddleware.js";
import passwordValidationMiddleware from "../middlewares/auth/passwordValidationMiddleware.js";


// import dos controllers
import createUserWithEmailAndPasswordController from "../controllers/auth/createUserWithEmailAndPasswordController.js";
import signInWithEmailAndPasswordController from "../controllers/auth/signInWithEmailAndPasswordController.js";
import signOutUserController from "../controllers/auth/signOutUserController.js";
import sendPasswordResetController from "../controllers/auth/sendPasswordResetController.js";
import confirmPasswordResetController from "../controllers/auth/confirmPasswordResetController.js";


dotenv.config();
const router = express.Router();

// Rotas abertas (sem autenticação)
router.post("/createUserWithEmailAndPassword", emailValidationMiddleware, passwordValidationMiddleware, createUserWithEmailAndPasswordController)
router.post("/newpassword", emailValidationMiddleware, sendPasswordResetController);

// Rotas protegidas (exigem autenticação)
router.post("/signInWithEmailAndPassword", emailValidationMiddleware, passwordValidationMiddleware, signInWithEmailAndPasswordController)
router.post("/signOut", signOutUserController);
router.post("/updateuserpassword", confirmPasswordResetController);


export default router;
