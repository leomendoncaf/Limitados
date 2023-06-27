import useConfig from "@/config/app.config";
import { useAppStore } from "@/store/app";
import { Err, Ok, Result, Unit, unit } from "../utils/result";
import { User } from "../user/user";
import { Expense } from "./expense";

async function _fetchExpenses(groupId:string): Promise<Result<Array<Expense>, string>> {
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

  const result = await fetch(`${appConfig.apiBaseUrl}/expenses/${groupId}`, params);

  if (result.ok) {
    const json = await result.json();
    const expenses: Array<Expense> = Array.from(json).map((expense: any)=>{
      return new Expense({
        id: expense.id,
        value: expense.total||0,
        description: expense.descricao,
        division: expense.division,
        date: new Date(expense.data),
        members: Array.from(expense.participantes).map((user:any)=> User.fromObject(user)),
        memberAmount:expense.memberAmount,
        group: {
          id:expense.grupo.id ,
          name: expense.grupo.name,
          description: expense.grupo.description,
          members: [],
        },
      });
    });
    return new Ok(expenses);
  }

  return new Err("Ocorreu algum erro ao buscar por despesas");
}

async function _fetchSingleExpense(expenseId:string): Promise<Result<Expense, string>> {
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

  const result = await fetch(`${appConfig.apiBaseUrl}/expense/${expenseId}`, params);

  if (result.ok) {
    const json = await result.json();
    const expense: Expense = new Expense({
      id: json.id,
      value: json.total||0,
      description: json.descricao,
      date: new Date(json.data),
      division: json.division,
      members: Array.from(json.participantes).map((user:any)=> User.fromObject(user)),
      memberAmount: json.memberAmount,
      group: {
        id:json.grupo.id ,
        name: json.grupo.name,
        description: json.grupo.description,
        members: [],
      },
    });
    return new Ok(expense);
  }

  return new Err("Ocorreu algum erro ao buscar por despesa");
}
async function _deleteExpense(expenseId:string): Promise<Result<Unit, string>> {
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "DELETe",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: appStore.user.token ?? "",
    },
  };

  const result = await fetch(`${appConfig.apiBaseUrl}/expenses/${expenseId}`, params);

  if (result.ok) {
    return new Ok(unit);
  }

  return new Err("Ocorreu um erro ao deletar despesa.");
}

async function _createExpense(expense: ExpenseCreationParams): Promise<Result<Unit, string>>{
  const appConfig = useConfig();
  const appStore = useAppStore();

  const params: RequestInit = {
    method: "POST",
    body: JSON.stringify(expense),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: appStore.user.token ?? "",
    },
  };
  const result = await fetch(`${appConfig.apiBaseUrl}/expenses`, params);
  if (result.status == 201){
    return new Ok(unit);
  }
  return new Err('Could not create expense.')
}

export type ExpenseCreationParams = {
  groupId: string;
  description: string;
  members: Array<string>;
  memberAmount: {[key: string]: number}
};

export const fetchGroupExpenses = _fetchExpenses;
export const fetchSingleExpense = _fetchSingleExpense;
export const deleteGroupExpense = _deleteExpense;
export const createExpense = _createExpense;
