import supabase from "../../config/supabaseClient.js";

// Função poara getSession
const getSessionService = async() => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {throw error;}
  return data;
};

export default getSessionService;
