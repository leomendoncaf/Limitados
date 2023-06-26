import { User } from "../user/user";

export interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
}
