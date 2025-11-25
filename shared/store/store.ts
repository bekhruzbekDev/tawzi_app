import { create } from "zustand";
import { UserData } from "../types/helper.types";

type Store = {
  user: UserData | null;
  setUserData: (user: UserData | null) => void;
};

export const useStore = create<Store>()((set) => ({
  user: { first_name: "a", username: "sas", role: "Consumer" },
  setUserData(user) {
    set({ user });
  },
}));
