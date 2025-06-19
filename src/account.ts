import { randomUUID } from "node:crypto";

export class Account {
  id: string;
  email: string;
  password: string;
  balance: number;
  constructor(email: string, password: string) {
    this.id = randomUUID();
    this.email = email;
    this.password = password;
    this.balance = 0;
  }
}
