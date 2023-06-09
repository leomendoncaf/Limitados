import { Group } from "../group/group";
import { User } from "../user/user";

export class Expense{
    id: string;
    value: number;
    description: string;
    group: Group;
    members: Array<User>;
    memberAmount: {[key: string]: number};
    date: Date;
    division: {[key: string]: {owes: number, owedBy: number}};

    constructor(
        {id, value, description, group, members, memberAmount, date, division}:
        {
            id: string;
            value: number;
            description: string;
            group: Group;
            members: Array<User>;
            memberAmount: {[key: string]: number};
            date: Date;
    division: {[key: string]: {owes: number, owedBy: number}};
        }
    ){
        this.id = id;
        this.value = value;
        this.description = description;
        this.group = group;
        this.members = members;
        this.memberAmount = memberAmount;
        this.date  = date;
        this.division = division;
    }
}