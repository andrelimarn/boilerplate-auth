import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  // Chamada interna à API para verificar a sessão no servidor
  // Note que usamos o URL interno do container ou localhost
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:4000
      headers: {
        // Passamos os cookies da requisição original para a API validar
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Se não houver sessão, redireciona para o login
  if (!session) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  // Se estiver logado, deixa passar
  return NextResponse.next();
}

// Configuração: Em quais rotas este middleware deve rodar?
export const config = {
  // Protege a rota /dashboard e tudo o que estiver dentro dela
  matcher: ["/dashboard/:path*"],
};