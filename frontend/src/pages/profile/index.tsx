import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import { useUpdateUserMutation } from "@/graphql/generated";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, setAuth, token, refreshToken } = useAuthStore();
  const [updateUserMutation, { loading }] = useUpdateUserMutation();

  const [name, setName] = useState(user?.name ?? "");
  const email = user?.email ?? "";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSaveChanges = async () => {
    if (!user?.id || !token || !refreshToken) return;

    if (name.trim() === "") {
      toast.error("O nome não pode estar vazio");
      return;
    }

    if (name === user.name) {
      toast.info("Nenhuma alteração para salvar");
      return;
    }

    try {
      const result = await updateUserMutation({
        variables: {
          id: user.id,
          data: {
            name: name.trim(),
          },
        },
      });

      if (result.data?.updateUser) {
        const updatedUser = result.data.updateUser;
        setAuth(token, refreshToken, {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role ?? undefined,
        });
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar perfil";
      toast.error(message);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Você saiu da sua conta");
    navigate("/login");
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-full max-w-md rounded-lg border-2 border-dashed border-zinc-300 bg-white p-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={name} />
            <AvatarFallback className="bg-green-700 text-white text-xl font-medium">
              {getInitials(name || "U")}
            </AvatarFallback>
          </Avatar>

          <h1 className="mt-4 text-lg font-semibold text-zinc-900">{name}</h1>
          <p className="text-sm text-zinc-500">{email}</p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-700">
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 pl-10 bg-zinc-50 border-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-700">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="h-11 pl-10 bg-zinc-50 border-zinc-200"
              />
            </div>
            <p className="text-xs text-zinc-500">O e-mail não pode ser alterado</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleSaveChanges}
            className="w-full h-11 bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-11 border-zinc-200 text-zinc-700 hover:bg-zinc-50"
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
