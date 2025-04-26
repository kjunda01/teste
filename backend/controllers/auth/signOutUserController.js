import signOutUserService from "../../services/auth/signOutUserService.js";

const signOutUserController = async (req, res) => {
  try {
    const response = await signOutUserService();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default signOutUserController;
