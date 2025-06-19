import { randomUUID } from "crypto";
import { ICommandHandler } from "../../@core/command/interfaces";
import { Account } from "../../account";
import { CreateAccountCommand } from "../create-account";

export interface CreateAccountHandlerOutput {
  id: string;
  email: string;
}

export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  async execute(
    command: CreateAccountCommand
  ): Promise<CreateAccountHandlerOutput> {
    const { email, password } = command;
    const account = new Account(email, password);
    return {
      id: randomUUID(),
      email: account.email,
    };
  }
}
