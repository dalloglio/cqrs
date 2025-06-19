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
});
