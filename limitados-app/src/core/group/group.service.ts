import useConfig from "@/config/app.config";
import { useAppStore } from "@/store/app";
import { Err, Ok, Result, Unit, unit } from "../utils/result";
import { Group } from "./group";
import { User } from "../user/user";

async function _fetchGroups(): Promise<Result<Array<Group>, string>> {
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

  const result = await fetch(`${appConfig.apiBaseUrl}/groups`, params);

  if (result.ok) {
    const json = await result.json();
    const groups: Array<Group> = Array.from(json).map((group: any)=>{
      return {
        id: group.id,
        name: group.name,
        description: group.description,
        members: Array.from(group.members).map((user:any)=> User.fromObject(user))
      }
    });
    return new Ok(groups);
  }

  return new Err("Ocorreu algum erro ao buscar por grupos");
}

async function _fetchGroupById(groupId: string): Promise<Result<Group, string>> {
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

  const result = await fetch(`${appConfig.apiBaseUrl}/group/${groupId}`, params);

  if (result.ok) {
    const json = await result.json();
    const group: Group = {
      id: json.id,
      name: json.name,
      description: json.description,
      members: Array.from(json.members).map((user:any)=> User.fromObject(user))
    };
    return new Ok(group);
  }

  return new Err("Ocorreu algum erro ao buscar pelo grupo");
}

async function _deleteGroup(groupId: string): Promise<Result<Unit, string>>{
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: appStore.user.token ?? "",
    },
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/group/${groupId}`, params);

  if (result.status == 200){
    return new Ok(unit);
  }

  if (result.status == 404){
    return new Err('Grupo não encontrado.');
  }

  return new Err('Não foi possível excluir o grupo.');
}

async function _createGroup(group: CreateGroupParams): Promise<Result<Group, string>>{
  const appConfig = useConfig();
  const appStore = useAppStore();


  const params: RequestInit = {
    method: "POST",
    body: JSON.stringify(group),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: appStore.user.token ?? "",
    },
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/group`, params);

  if (result.status == 201){
    const data = await result.json();
    return new Ok(data);
  }

  return new Err('Não foi possível criar o grupo.');
}

export type CreateGroupParams = {
  name: string;
  description: string;
  members: string[];
}


export const loadGroupsData = _fetchGroups;
export const fetchGroupById = _fetchGroupById;
export const deleteGroup = _deleteGroup;
export const createGroup = _createGroup;