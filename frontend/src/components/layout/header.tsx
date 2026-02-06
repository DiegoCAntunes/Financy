import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transações", href: "/transactions" },
  { label: "Categorias", href: "/categories" },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-primary"
              />
              <text
                x="16"
                y="21"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="currentColor"
                className="text-primary"
              >
                $$
              </text>
            </svg>
            <span className="text-xl font-bold tracking-tight text-primary">
              FINANCY
            </span>
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

        <Link to="/profile">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-zinc-200 text-zinc-600 text-sm font-medium">
              CT
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
