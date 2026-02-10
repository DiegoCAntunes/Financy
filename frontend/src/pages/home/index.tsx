import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import LoginPage from "@/pages/auth/login";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
}
