import supabase from "../../config/supabaseClient.js";

// Função para updateUserPassword
const updateUserPasswordService = async(password) => {
  // Atualiza a senha do usuário logado
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {throw error;}
  return data;
};

export default updateUserPasswordService;
