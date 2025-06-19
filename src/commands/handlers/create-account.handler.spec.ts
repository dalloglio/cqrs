import { ICommand, ICommandHandler } from "../../@core/command/interfaces";
import { CreateAccountHandler } from "./create-account.handler";

describe("CreateAccountHandler", () => {
  let command: ICommand;
  let createAccountHandler: ICommandHandler;

  beforeEach(() => {
    command = { email: "email", password: "password" };
    createAccountHandler = new CreateAccountHandler();
  });

  it("should create an account", async () => {
    const result = await createAccountHandler.execute(command);
    expect(result.id).toBeDefined();
    expect(result.email).toBe("email");
  });
});
