import { useState, useCallback } from "react";

import { authService } from "@/services/auth-service";

import { AuthState, User } from "@/types/User.types";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const user = await authService.login(email, password);
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw error instanceof Error ? error : new Error("Login failed");
      }
    },
    []
  );

  const logout = useCallback((): void => {
    authService.logout();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
  };
};
