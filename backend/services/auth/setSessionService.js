import supabase from "../../config/supabaseClient.js";

// Função para setSession
const setSessionService = async(access_token, refresh_token) => {
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) {throw error;}

  return data.session;
};

export default setSessionService;
