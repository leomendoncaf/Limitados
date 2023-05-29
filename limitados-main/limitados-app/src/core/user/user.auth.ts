import useConfig from "@/config/app.config";
import { useAppStore } from "@/store/app";
import { Err, Ok, Result } from "../utils/result";

async function loginWithEmail(
  email: string,
  password: string
): Promise<Result<string, string>> {
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/login`, params);

  if (result.ok) {
    const json = await result.json();
    const token = json.token;
    appStore.$state.user.token = token;
    return new Ok(token);
  }

  return new Err("Credenciais inválidas");
}

async function signUp(
  name: string,
  email: string,
  password: string
): Promise<Result<string, string>> {
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/signup`, params);

  if (result.ok) {
    const json = await result.json();
    const token = json.token;
    appStore.$state.user.token = token;
    return new Ok(token);
  }

  if (result.status == 400) {
    return new Err("Usuário já cadastrado, tente um novo email");
  }

  return new Err("Credenciais inválidas");
}

export const useLoginWithEmail = loginWithEmail;
export const useSignUp = signUp;
