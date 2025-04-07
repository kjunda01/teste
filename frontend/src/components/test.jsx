import { createContext, useEffect, useState } from "react";
import supabase from "../../../backend/config/supabaseClient";

const SessionContext = createContext(null);

function AppTeste() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <App />
    </SessionContext.Provider>
  );
}
export default AppTeste;
