import supabase from "./config/supabaseClient.js";


// Função para resetPasswordForEmail
export const resetPasswordForEmailService = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error);

  return data;
};


// const { data, error } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resetpasswordforemail`, email);

let { data, error } = await supabase.auth.resetPasswordForEmail("sinvaljuniorlms@gmail.com")
console.log(data)