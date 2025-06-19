import { randomUUID } from "node:crypto";

export class Account {
  id: string;
  email: string;
  password: string;
  balance: number;
  constructor(email: string, password: string) {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (password.length < 8) throw new Error("Password must be at least 8 characters");
    if (!Account.isStrongPassword(password)) throw new Error("Password is not strong enough");
    this.id = randomUUID();
    this.email = email;
    this.password = password;
    this.balance = 0;
  }

  private static isStrongPassword(password: string): boolean {
    // At least one uppercase, one lowercase, one number, one special char
    return /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);
  }
}
