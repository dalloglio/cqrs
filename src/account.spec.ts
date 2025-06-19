import { Account } from "./account";

describe("Account", () => {
  it("should create an account with valid email and strong password", () => {
    const account = new Account("test@example.com", "Str0ngP@ssw0rd!");
    expect(account).toBeDefined();
    expect(account.id).toBeDefined();
    expect(account.email).toBe("test@example.com");
    expect(account.password).toBe("Str0ngP@ssw0rd!");
    expect(account.balance).toBe(0);
  });

  it("should throw if email is missing", () => {
    expect(() => new Account("", "Str0ngP@ssw0rd!")).toThrow();
  });

  it("should throw if password is missing", () => {
    expect(() => new Account("test@example.com", "")).toThrow();
  });

  it("should throw if password is less than 8 characters", () => {
    expect(() => new Account("test@example.com", "short")).toThrow();
  });

  it("should throw if password is not strong enough", () => {
    // No uppercase, no special char, no number
    expect(() => new Account("test@example.com", "password")).toThrow();
    // No lowercase
    expect(() => new Account("test@example.com", "PASSWORD1!")).toThrow();
    // No number
    expect(() => new Account("test@example.com", "Password!")).toThrow();
    // No special character
    expect(() => new Account("test@example.com", "Password1")).toThrow();
  });

  it("should create accounts with unique ids", () => {
    const account1 = new Account("a@a.com", "Str0ngP@ssw0rd!");
    const account2 = new Account("b@b.com", "An0ther$trong1");
    expect(account1.id).not.toBe(account2.id);
  });
});
