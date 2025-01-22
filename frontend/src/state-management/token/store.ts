import { create } from "zustand";

interface tokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<tokenStore>((set) => ({
  token: null,
  setToken: (token) => set(() => ({ token })),
  clearToken: () => set(() => ({ token: null })),
}));

export default useTokenStore;
