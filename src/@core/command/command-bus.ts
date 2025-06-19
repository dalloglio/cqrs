import { ICommand, ICommandBus, ICommandHandler } from "./interfaces";

export class CommandBus implements ICommandBus {
  readonly handlers: Map<ICommand, ICommandHandler>;

  constructor() {
    this.handlers = new Map();
  }

  register(command: ICommand, handler: ICommandHandler): void {
    this.handlers.set(command, handler);
  }

  unregister(command: ICommand): void {
    this.handlers.delete(command);
  }

  execute<T extends ICommand = ICommand, R = any>(command: T): Promise<R> {
    const handler = this.handlers.get(command);
    if (!handler) {
      throw new Error(`No handler for command ${command}`);
    }
    return handler.execute(command);
  }
}
