import supabase from "../../config/supabaseClient.js";

// Função para signOut
const signOutService = async() => {
  const { data, error } = await supabase.auth.signOut();
  if (error) {throw error;}
  return data;
};

export default signOutService;
