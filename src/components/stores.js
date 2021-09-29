import create from "zustand";

export const useStore = create((set) => ({
  user: null,
  profile: {},
  searchInput: '',
  setSearchInput: (searchInput) => set({ searchInput }),
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}));
