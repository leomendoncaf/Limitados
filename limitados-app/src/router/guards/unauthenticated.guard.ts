import { NavigationGuard } from "vue-router";

export const unauthenticatedGuard: NavigationGuard = (to, from, next) => {
  const appStorage = localStorage.getItem("app");

  const appState = appStorage ? JSON.parse(appStorage) : {};
  const isAuthenticated = (appState.user?.token?.length ?? 0) > 0;
  //   return next();
  if (isAuthenticated) {
    return next("/");
  } else {
    return next();
  }
};
