import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;

  setAuth: (token: string, refreshToken: string, user: User) => void;
  setRememberMe: (remember: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      rememberMe: false,

      setAuth: (token, refreshToken, user) => {
        localStorage.setItem("financy-token", token);
        localStorage.setItem("financy-refresh-token", refreshToken);
        set({
          token,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      },

      setRememberMe: (remember) => set({ rememberMe: remember }),

      logout: () => {
        localStorage.removeItem("financy-token");
        localStorage.removeItem("financy-refresh-token");
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "financy-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
