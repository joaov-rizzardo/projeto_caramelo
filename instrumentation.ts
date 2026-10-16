import { missingEnv } from "@/lib/env";

// Runs once when the server starts: refuse to boot with a broken config
// rather than failing later on a visitor's request.
export function register() {
  const missing = missingEnv();
  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente ausentes: ${missing.join(", ")} (veja .env.example).`);
  }
}
