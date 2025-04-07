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

  // if (!data.user?.confirmed_at) {
  //   throw new Error("Conta ainda não confirmada. Verifique seu e-mail.");
  // }

  if (error) throw new Error(error.message);

  return {
    id: data.user?.id,
    email: data.user?.email,
    created_at: data.user?.created_at,
  };
};

// Função para signInWithPassword
export const signInWithPasswordService = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  
  // if (!data.user?.confirmed_at) {
  //   throw new Error("Conta ainda não confirmada. Verifique seu e-mail.");
  // }
  
  if (error) throw new Error(error.message);

  return {
    id: data.user?.id,
    email: data.user?.email,
    token: data.session?.access_token,
    expires_in: data.session?.expires_in,
  };
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

// Função para getSession
export const getSessionService = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data;
};

// Função para signOut
export const signOutService = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return data;
};

// Função para onAuthStateChange
export const onAuthStateChangeService = async (event, session) => {
  const { data, error } = await supabase.auth.onAuthStateChange(event, session);
  if (error) throw new Error(error.message);
  return data;
};
