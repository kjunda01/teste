import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`\n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\nServidor rodando na porta ${PORT} \n🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n`)
);
