import { getUserByEmailService } from "./services/authService.js";
import express from "express";

const router = express.Router();


const signOutController = async (req, res) => {
    try {
        console.log(req)
        const data = await signOutService();
        res.status(200).json({ message: "Usuário deslogado!", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const signOutService = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return data;
};

signOutController();
router.post("/signout", signOutController);