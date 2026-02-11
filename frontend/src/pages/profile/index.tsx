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
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
      <div className="w-full max-w-md rounded-lg border-2 border-dashed border-border bg-background p-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
              {getInitials(name || "U")}
            </AvatarFallback>
          </Avatar>

          <h1 className="mt-4 text-lg font-semibold text-foreground">{name}</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleSaveChanges}
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </Button>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full h-11"
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
