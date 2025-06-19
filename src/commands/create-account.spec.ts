import { CreateAccountCommand } from "./create-account";

describe("CreateAccount Command", () => {
  it("should create an instance", () => {
    const command = new CreateAccountCommand("email", "password");
    expect(command).toBeDefined();
    expect(command.email).toEqual("email");
    expect(command.password).toEqual("password");
  });
});
