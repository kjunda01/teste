import supabase from "../config/supabaseClient.js";
import supabaseAdmin from "../config/supabaseServiceRoleClient.js";

// Função para verificar se usuario existe
export const getUserByEmailService = async (email) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  const user = data.users.find((user) => user.email === email);

  if (error) throw new Error(error.message);
  return user;
};

// Função para signUp
export const signUpService = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

// Função para signInWithPassword
export const signInWithPasswordService = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

// Função para signInWithPassword
export const resetPasswordForEmailService = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
  return data;
};

// Função para updateUser
export const updateUserService = async (email, password) => {
  const { data, error } = await supabase.auth.updateUser({ email, password });
  if (error) throw new Error(error.message);
  return data;
};
