import supabaseAdmin from "../../config/supabaseServiceRoleClient.js";

// Função para verificar se usuario existe
const getUserByEmailService = async(email) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw error;
  }

  const users = data.users.find((user) => user.email === email);

  return users ? true : false;
};

export default getUserByEmailService;
