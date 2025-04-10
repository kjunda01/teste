import supabase from "../config/supabaseClient.js";
import supabaseAdmin from "../config/supabaseServiceRoleClient.js";

// Função para verificar se usuario existe
export const getUserByEmailService = async (email) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) throw error;

  const user = data.users.find((user) => user.email === email);

  return user ? true : false;
};

// Função para signUp
export const signUpService = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  // if (!data.user?.confirmed_at) {
  //   throw new Error("Conta ainda não confirmada. Verifique seu e-mail.");
  // }

  if (error) throw error;

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

  if (error) throw error;

  return {
    id: data.user?.id,
    email: data.user?.email,
    token: data.session?.access_token,
    expires_in: data.session?.expires_in,
  };
};

// Função para resetPasswordForEmail
export const resetPasswordForEmailService = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://192.168.1.190:5173/newpassword", // ou localhost:5173, conforme onde estiver testando
  });
  
  if (error) throw error;

  return data;
};

// Função para updateUser
export const updateUserService = async (email, password) => {
  const { data, error } = await supabase.auth.updateUser({ email, password });
  if (error) throw new Error(error.message);
  return data;
};

// Função para updateUserPassword
export const updateUserPasswordService = async (accessToken, newPassword) => {
  // Define a sessão do usuário no Supabase com o token recebido
  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: "",
  });

  if (sessionError) {
    throw new Error("Erro ao definir a sessão: " + sessionError.message);
  }

  // Atualiza a senha do usuário logado
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw new Error("Erro ao atualizar a senha: " + error.message);
  }

  return true;
};

// Função para signOut
export const signOutService = async () => {
  const { data, error } = await supabase.auth.signOut();
  if (error) throw error;
  return data;
};

// Função para setSession

export const setSessionService = async (password, access_token) => {
  const { data: session, error: sessionError } = await supabase.auth.setSession({
    access_token,
    refresh_token: "", // não é necessário para password recovery
  });

  if (sessionError) throw new Error("Token inválido ou expirado.");

  const { error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error("Erro ao redefinir senha.");
};
