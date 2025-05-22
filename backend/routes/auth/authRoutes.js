import express from "express";
import dotenv from "dotenv";


// Importação dos middlewares
import authMiddleware from "../middlewares/authMiddleware.js";
import emailValidationMiddleware from "../middlewares/auth/emailValidationMiddleware.js";
import passwordValidationMiddleware from "../middlewares/auth/passwordValidationMiddleware.js";

// Importação dos controllers
import createUserWithEmailAndPasswordController from "../controllers/auth/createUserWithEmailAndPasswordController.js";
import signInWithEmailAndPasswordController from "../controllers/auth/signInWithEmailAndPasswordController.js";
import signOutUserController from "../controllers/auth/signOutUserController.js";
import sendPasswordResetController from "../controllers/auth/sendPasswordResetController.js";
import confirmPasswordResetController from "../controllers/auth/confirmPasswordResetController.js";
import getUserProfileController from "../controllers/auth/getUserProfileController.js";

dotenv.config();

const authRoutes = express.Router();

// 🔓 Rotas abertas (não exigem token)
authRoutes.post("/createUserWithEmailAndPassword", emailValidationMiddleware, passwordValidationMiddleware, createUserWithEmailAndPasswordController);
authRoutes.post("/newpassword", emailValidationMiddleware, sendPasswordResetController);
authRoutes.post("/signInWithEmailAndPassword", emailValidationMiddleware, passwordValidationMiddleware, signInWithEmailAndPasswordController);
authRoutes.post("/confirmPasswordReset", confirmPasswordResetController);


authRoutes.use(authMiddleware); // tudo abaixo daqui vai exigir token
// 🔒 Rotas protegidas (exigem autenticação válida)
authRoutes.post("/signOut", signOutUserController);
authRoutes.get("/profile", getUserProfileController);

// Aqui é para adicionar mais rotas protegidas no futuro
//authRoutes.get("/userdata", getUserDataController);

export default authRoutes;
