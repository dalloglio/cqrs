import { Account } from "./account";

describe("Account", () => {
  let account: Account;
  it("should create an account", () => {
    account = new Account("email", "password");
    expect(account).toBeDefined();
    expect(account.id).toBeDefined();
    expect(account.email).toBe("email");
    expect(account.password).toBe("password");
    expect(account.balance).toBe(0);
  });

  it("should create accounts with unique ids", () => {
    const account1 = new Account("a", "b");
    const account2 = new Account("a", "b");
    expect(account1.id).not.toBe(account2.id);
  });
});
