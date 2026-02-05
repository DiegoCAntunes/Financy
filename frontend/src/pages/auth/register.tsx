import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, LogIn } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout, AuthCard } from "@/components/auth/auth-layout";
import { Logo } from "@/components/auth/logo";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthDivider } from "@/components/auth/auth-divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { useRegisterMutation } from "@/graphql/generated";
import { useAuthStore } from "@/stores/auth-store";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [registerMutation, { loading }] = useRegisterMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const result = await registerMutation({
        variables: {
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });

      if (result.data?.register) {
        const { token, refreshToken, user } = result.data.register;
        setAuth(token, refreshToken, user);
        toast.success("Conta criada com sucesso!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta";
      toast.error(message);
    }
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <Logo />
      </div>

      <AuthCard>
        <CardHeader className="text-center space-y-1 px-8 pt-8 pb-6">
          <CardTitle className="text-xl font-bold text-gray-900">
            Criar conta
          </CardTitle>
          <CardDescription className="text-gray-500">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Nome completo
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <Input
                          placeholder="Seu nome completo"
                          className="pl-10 h-11 border-gray-300 focus:border-primary focus:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <Input
                          placeholder="mail@exemplo.com"
                          className="pl-10 h-11 border-gray-300 focus:border-primary focus:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Senha
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
                      A senha deve ter no mínimo 8 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-green-800 hover:bg-green-900 text-white font-medium"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>

          <AuthDivider />

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">Já tem uma conta?</p>
            <Button
              variant="outline"
              className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Fazer login
              </Link>
            </Button>
          </div>
        </CardContent>
      </AuthCard>
    </AuthLayout>
  );
}
