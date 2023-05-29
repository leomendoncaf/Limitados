// Utilities
import { User } from "@/core/user/user";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    user: useLocalStorage("user", {
      id: "",
      name: "",
      email: "",
      balance: 0,
      token: "",
    }).value,
  }),
  actions: {
    logout() {
      localStorage.clear();
      this.$reset();
    },
  },
  getters: {
    isAuthenticated: (state) => (state.user?.token?.length ?? 0) > 0,
  },
});

useLocalStorage;

export interface AppState {
  user: User;
}

useAppStore().$subscribe((mutation, state) => {
  localStorage.setItem("app", JSON.stringify(state));
});
