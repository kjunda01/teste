import supabase from "../../config/supabaseClient.js";

// Função para resetPasswordForEmail
const resetPasswordForEmailService = async(email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_LOCAL_URL}/newpassword`, // ou localhost:5173, conforme onde estiver testando
  });

  if (error) {throw error;}

  return data;
};

export default resetPasswordForEmailService;
