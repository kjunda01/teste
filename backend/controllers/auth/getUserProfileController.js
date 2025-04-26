async function getUserProfileController(req, res) {
  try {
    const { uid, email, name } = req.user;

    return res.status(200).json({
      uid,
      email,
      name: name || null, // pode não ter nome configurado
    });
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    return res.status(500).json({ error: "Erro ao obter perfil do usuário." });
  }
}

export default getUserProfileController;
