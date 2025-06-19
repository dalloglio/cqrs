import { ICommand } from "../@core/command/interfaces";

export class CreateAccountCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
