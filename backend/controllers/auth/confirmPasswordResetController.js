import confirmPasswordResetService from "../../services/auth/confirmPasswordResetService.js";

const confirmPasswordResetController = async (req, res) => {
  const { oobCode, newPassword } = req.body;

  try {
    const response = await confirmPasswordResetService(oobCode, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default confirmPasswordResetController;
