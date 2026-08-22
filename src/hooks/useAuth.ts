/**
 * Placeholder auth hook. Real authentication will replace this later;
 * keep the shape stable so consuming components don't change.
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "member" | "admin";
};

export type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export function useAuth(): AuthState {
  return { user: null, isAuthenticated: false, isLoading: false };
}
