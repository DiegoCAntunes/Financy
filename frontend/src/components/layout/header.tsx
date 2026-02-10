import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

function getInitials(name: string | undefined): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transações", href: "/transactions" },
  { label: "Categorias", href: "/categories" },
];

export function Header() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[69px] max-w-[1280px] items-center justify-between px-12 py-4">
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center gap-[11px]">
            <img src="/logo-symbol.svg" alt="Financy" className="h-8 w-8" />
            <img src="/logo-text.svg" alt="Financy" className="h-[19px] w-[90px]" />
          </Link>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link to="/profile" aria-label="Ir para perfil">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarFallback className="bg-zinc-200 text-zinc-600 text-sm font-medium">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
