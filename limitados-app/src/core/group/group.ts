import { User } from "../user/user";

export interface Group {
  name: string;
  description: string;
  members: User[];
}
