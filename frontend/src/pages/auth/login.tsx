import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout, AuthCard } from "@/components/auth/auth-layout";
import { Logo } from "@/components/auth/logo";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthDivider } from "@/components/auth/auth-divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/form";

import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useLoginMutation } from "@/graphql/generated";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth, setRememberMe } = useAuthStore();
  const [loginMutation, { loading }] = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      if (data.rememberMe) {
        setRememberMe(true);
      }

      const result = await loginMutation({
        variables: {
          data: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (result.data?.login) {
        const { token, refreshToken, user } = result.data.login;
        setAuth(token, refreshToken, user);
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro ao fazer login";
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
          <CardTitle className="text-xl font-bold text-foreground">
            Fazer login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          placeholder="mail@exemplo.com"
                          className="pl-10 h-11 border-border focus:border-primary focus:ring-primary"
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
                    <FormLabel className="text-sm font-medium text-foreground">
                      Senha
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        className="h-11 border-border focus:border-primary focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                        Lembrar-me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Recuperar senha
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>

          <AuthDivider />

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Ainda não tem uma conta?</p>
            <Button
              variant="outline"
              className="w-full h-11"
              asChild
            >
              <Link to="/register">
                <UserPlus className="mr-2 h-4 w-4" />
                Criar conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </AuthCard>
    </AuthLayout>
  );
}
