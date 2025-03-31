import supabase from "../config/supabaseClient.js";

// Função para signInWithPassword
export const signInWithPasswordService = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};
