import { create } from "zustand";
import type { AuthUser } from "../interfaces/auth-user.interface";

type AuthState = {
	roles: string[];
	user: AuthUser | null;
	clearUser: () => void;
	setUser: (user: AuthUser) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	roles: [],
	user: null,
	clearUser: () => set({ roles: [], user: null }),
	setUser: (user) => set({ roles: user.roles, user }),
}));
