import { Group } from "../group/group";
import { Expense } from "./expense";

export type UserBalance = {
    pay: number;
    receive: number;
    original: number;
}
export function calculateExpenses(group: Group, expenses: Expense[]):{
    total: number,
    average: number,
    balances: {[key: string]: UserBalance}
}
{
    let participantsFactor = group.members.length;
    if (participantsFactor < 1){
        participantsFactor = 1;
    }

    const total = expenses
    .map((expense)=>  expense.value)
    .reduce((prev, current)=> prev+current, 0);

    const averageExpense = total / participantsFactor;

    const userAmounts = expenses
        .map((expense)=> Object.entries<number>(expense.memberAmount||{}))
        .flat();

    const userTotal = new Map<string,number>();

    for (const amount of userAmounts){
        const [key,val] = amount;
        if(userTotal.has(key)){
            const previous = userTotal.get(key)||0;
            userTotal.set(key,previous+val);
        }else {
            userTotal.set(key, val)
        }
    }

    const userBalance: {[key: string]: UserBalance} = {};

    for (const user of group.members){
        const userAmount = userTotal.get(user.id) || 0;
        const payDiff = userAmount - averageExpense;
        if (payDiff < 0 ){
            userBalance[user.id] = {
                original: userAmount,
                pay: -payDiff,
                receive: 0,
            }
        }else{
            userBalance[user.id] = {
                original: userAmount,
                pay: 0,
                receive: payDiff,
            }
        }
    }

    return {
        total: total,
        average: averageExpense,
        balances: userBalance,
    };
}