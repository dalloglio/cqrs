export interface ICommand {}
export interface ICommandHandler<T extends ICommand = ICommand, R = any> {
  execute(command: T): Promise<R>;
}
export interface ICommandBus {
  handlers: Map<ICommand, ICommandHandler>;
  register(command: ICommand, handler: ICommandHandler): void;
  unregister(command: ICommand): void;
  execute<T extends ICommand = ICommand, R = any>(command: T): Promise<R>;
}
