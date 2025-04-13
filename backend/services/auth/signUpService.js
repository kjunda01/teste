import supabase from "../../config/supabaseClient.js";

// Função para signUp
const signUpService = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  // if (!data.user?.confirmed_at) {
  //   throw new Error("Conta ainda não confirmada. Verifique seu e-mail.");
  // }

  if (error) {
    throw error;
  }

  // return {
  //   id: data.user?.id,
  //   email: data.user?.email,
  //   created_at: data.user?.created_at,
  // };
  return data;
};

export default signUpService;
