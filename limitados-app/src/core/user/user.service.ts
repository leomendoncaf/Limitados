import useConfig from "@/config/app.config";
import { Err, Ok, Result } from "../utils/result";
import { User } from "./user";
import { useAppStore } from "@/store/app";

async function _fetchUsers(): Promise<Result<Array<User>, string>> {
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

    const result = await fetch(`${appConfig.apiBaseUrl}/users`, params);

    if (result.ok) {
      const json = await result.json();
      const users: Array<User> = Array.from(json).map((user: any)=>User.fromObject(user));
      return new Ok(users);
    }

    return new Err("Ocorreu algum erro ao buscar por usuários");
  }

  export const fetchUsers = _fetchUsers;