import supabase from "../config/supabaseClient";

// User login
const { data, error } = await supabase.auth.signInWithPassword(
  {
    email: "someone@email.com",
    password: "DTlyIlzmmtQhKNyTjLeG",
  },
);