import supabase from "../../config/supabaseClient.js";

// Função para signInWithPassword
const signInWithPasswordService = async(email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  // if (!data.user?.confirmed_at) {
  //   throw new Error("Conta ainda não confirmada. Verifique seu e-mail.");
  // }

  if (error) {throw error;}

  return {
    id: data.user?.id,
    email: data.user?.email,
    token: data.session?.access_token,
    expires_in: data.session?.expires_in,
  };
};

export default signInWithPasswordService;
