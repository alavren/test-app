import { create } from 'zustand';

type User = {
  email: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => {
  const storedUser = localStorage?.getItem('user');
  const initialState = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialState,
    setUser: (user) => {
      set({ user });
      localStorage?.setItem('user', JSON.stringify(user));
    },
    login: (email) => {
      const user = { email };
      set({ user });
      localStorage?.setItem('user', JSON.stringify(user));
    },
    logout: () => {
      set({ user: null });
      localStorage?.removeItem('user');
    },
  };
});