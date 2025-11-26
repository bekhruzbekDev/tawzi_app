import { create } from "zustand";
import { UserData } from "../types/helper.types";

type Store = {
  user: UserData | null;
  setUserData: (user: UserData | null) => void;
  tabBarInset: number;
  setTabBarInset: (value: number) => void;
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const useStore = create<Store>()((set) => ({
  user: {
    first_name: "Behruz",
    last_name: "Pardayev",
    username: "behruz",
    role: "Consumer",
  },
  tabBarInset: 66,
  setUserData(user) {
    set({ user });
  },
  setTabBarInset(value) {
    set({ tabBarInset: value });
  },
  isDarkMode: false,
  setDarkMode(value) {
    set({ isDarkMode: value });
  },
}));
