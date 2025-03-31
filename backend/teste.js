import supabase from "./config/supabaseClient.js";

export const signInWithPassword = async (user) => {
  const { data, error } = await supabase.auth.signInWithPassword(user);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

signInWithPassword({
  email: "sinvaljuniorlms@gmail.com",
  password: "Sinval123!@#",
});
