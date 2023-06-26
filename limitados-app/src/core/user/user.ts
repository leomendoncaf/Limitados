export class User {
  id: string;
  token?: string;
  name: string;
  email: string;
  balance?: number;

  constructor (
    {id, token, name, email, balance}:
    {
      id: string,
      token?: string,
      name: string,
      email: string,
      balance?: number
    }
  ){
    this.id = id;
    this.token = token;
    this.name = name;
    this.email = email;
    this.balance = balance
  }

  public static fromObject(object: {
    id: string,
    token?: string,
    name: string,
    email: string,
    balance?: number
  }): User {
    return new User(object)
  }
}
