import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import DashboardPage from "@/pages/dashboard";
import TransactionsPage from "@/pages/transactions";
import CategoriesPage from "@/pages/categories";
import ProfilePage from "@/pages/profile";
import { AppLayout } from "@/components/layout/app-layout";
import { PrivateRoute } from "@/components/auth/private-route";
import { PublicRoute } from "@/components/auth/public-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/transactions",
            element: <TransactionsPage />,
          },
          {
            path: "/categories",
            element: <CategoriesPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
