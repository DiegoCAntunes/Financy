import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { Toaster } from "@/components/ui/sonner";
import { apolloClient } from "@/lib/apollo-client";
import { router } from "@/routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ApolloProvider>
  </StrictMode>
);
