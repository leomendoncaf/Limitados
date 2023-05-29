import { NavigationGuard } from "vue-router";

export const authGuard: NavigationGuard = (to, from, next) => {
  const appStorage = localStorage.getItem("app");

  const appState = appStorage ? JSON.parse(appStorage) : {};
  const isAuthenticated = appState ? appState.user?.token.length > 0 : false;

  if (isAuthenticated) {
    return next();
  } else {
    return next("/login");
  }
};
