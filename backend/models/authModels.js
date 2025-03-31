import supabase from "../config/supabaseClient"

// User login
let { data, error } = await supabase.auth.signInWithPassword(
    {
  email: 'someone@email.com',
  password: 'DTlyIlzmmtQhKNyTjLeG'
}
)