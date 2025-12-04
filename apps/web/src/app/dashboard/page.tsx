"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  // Apenas buscamos os dados para exibir. A segurança é garantida pelo Middleware.
  const { data: session, isPending } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-up")
        },
      },
    })
  }

  // Ainda é boa prática mostrar um "loading" enquanto o cliente 
  // hidrata os dados da sessão para não mostrar campos vazios.
  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-zinc-500 animate-pulse">A carregar dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bem-vindo ao Dashboard! 🎉</CardTitle>
          <CardDescription>
            Você está seguro (protegido por Middleware).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Note que usamos o operador ?. (optional chaining) por segurança */}
          <div className="rounded-lg bg-zinc-100 p-4 text-center">
            <p className="text-sm text-zinc-500 mb-1">Logado como:</p>
            <p className="text-lg font-medium font-mono">{session?.user.name}</p>
            <p className="text-xs text-zinc-400">{session?.user.email}</p>
          </div>

          <Button 
            variant="destructive" 
            className="w-full mt-4" 
            onClick={handleLogout}
          >
            Terminar Sessão (Logout)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}