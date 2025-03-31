import express from "express";
import { signInWithPasswordController } from "../controllers/authController.js";

const router = express.Router();

// router.post("/auth/register", registerUser);
router.post("/login", signInWithPasswordController);
// router.post("/auth/oauth", loginWithOAuth);
// router.get("/auth/user", getCurrentUser);
// router.post("/auth/recover-password", recoverPassword);
// router.put("/auth/update-user", updateUserData);
// router.post("/auth/logout", logoutUser);

export default router;
