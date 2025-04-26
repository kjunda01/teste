import sendPasswordResetService from "../../services/auth/sendPasswordResetService.js";

const sendPasswordResetController = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await sendPasswordResetService(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default sendPasswordResetController;
