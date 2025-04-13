import supabase from "../../config/supabaseClient.js";

// Função para updateUser
const updateUserService = async(email, password) => {
  const { data, error } = await supabase.auth.updateUser({ email, password });
  if (error) {throw new Error(error.message);}
  return data;
};

export default updateUserService;
