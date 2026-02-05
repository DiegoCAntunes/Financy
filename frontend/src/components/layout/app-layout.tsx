import { Outlet } from "react-router-dom";
import { Header } from "./header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
