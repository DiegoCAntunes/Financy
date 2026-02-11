import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary p-4">
      {children}
    </div>
  );
}

export function AuthCard({ children }: AuthLayoutProps) {
  return (
    <Card className="w-full max-w-md bg-background shadow-lg rounded-xl border border-border">
      {children}
    </Card>
  );
}
