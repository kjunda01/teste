import express from "express";
import dotenv from "dotenv";

// Importação dos middlewares
import authMiddleware from "../../middlewares/authMiddleware.js";
import emailValidationMiddleware from "../../middlewares/auth/emailValidationMiddleware.js";
import passwordValidationMiddleware from "../../middlewares/auth/passwordValidationMiddleware.js";

// Importação dos controllers
import createUserWithEmailAndPasswordController from "../../controllers/auth/createUserWithEmailAndPasswordController.js";
import signInWithEmailAndPasswordController from "../../controllers/auth/signInWithEmailAndPasswordController.js";
import signOutUserController from "../../controllers/auth/signOutUserController.js";
import sendPasswordResetController from "../../controllers/auth/sendPasswordResetController.js";
import confirmPasswordResetController from "../../controllers/auth/confirmPasswordResetController.js";
import getUserProfileController from "../../controllers/auth/getUserProfileController.js";

dotenv.config();

const router = express.Router();

// 🔓 Rotas abertas (não exigem token)
router.post(
  "/createUserWithEmailAndPassword",
  emailValidationMiddleware,
  passwordValidationMiddleware,
  createUserWithEmailAndPasswordController
);
router.post("/newpassword", emailValidationMiddleware, sendPasswordResetController);
router.post(
  "/signInWithEmailAndPassword",
  emailValidationMiddleware,
  passwordValidationMiddleware,
  signInWithEmailAndPasswordController
);
router.post("/confirmPasswordReset", confirmPasswordResetController);

router.use(authMiddleware); // tudo abaixo daqui vai exigir token
// 🔒 Rotas protegidas (exigem autenticação válida)
router.post("/signOut", signOutUserController);
router.get("/profile", getUserProfileController);

// Aqui é para adicionar mais rotas protegidas no futuro
//router.get("/userdata", getUserDataController);

export default router;
