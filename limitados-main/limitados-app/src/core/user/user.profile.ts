import useConfig from "@/config/app.config";
import { useAppStore } from "@/store/app";
import { Err, Ok, Result, Unit, unit } from "../utils/result";
import { User } from "./user";

async function _loadUserData(): Promise<Result<Unit, string>> {
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: appStore.user.token ?? "",
    },
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/user`, params);

  if (result.ok) {
    const json = await result.json();
    const user: User = {
      id: json.id,
      name: json.name,
      email: json.email,
      balance: json.balance,
      token: appStore.user.token,
    };
    appStore.$state.user = user;
    return new Ok(unit);
  }

  return new Err("Usuário não encontrado");
}

export const loadUserData = _loadUserData;
