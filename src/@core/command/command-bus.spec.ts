import { CommandBus } from "./command-bus";
import { ICommand, ICommandBus, ICommandHandler } from "./interfaces";

class MockCommand1 implements ICommand {}
class MockCommand2 implements ICommand {}
const MockCommandHandler1: jest.Mock<ICommandHandler> = jest
  .fn()
  .mockImplementation(() => ({
    execute: jest.fn(),
  }));

const MockCommandHandler2: jest.Mock<ICommandHandler> = jest
  .fn()
  .mockImplementation(() => ({
    execute: jest.fn(),
  }));

describe("CommandBus", () => {
  let command1: ICommand;
  let command2: ICommand;
  let handler1: ICommandHandler;
  let handler2: ICommandHandler;
  let commandBus: ICommandBus;

  beforeEach(() => {
    command1 = new MockCommand1();
    command2 = new MockCommand2();
    handler1 = new MockCommandHandler1();
    handler2 = new MockCommandHandler2();
    commandBus = new CommandBus();
  });

  it("should register command handlers", () => {
    commandBus.register(command1, handler1);
    commandBus.register(command2, handler2);
    expect(commandBus.handlers.has(command1)).toBeTruthy();
    expect(commandBus.handlers.has(command2)).toBeTruthy();
    expect(commandBus.handlers.size).toBe(2);
  });

  it("should unregister command handlers", () => {
    commandBus.register(command1, handler1);
    commandBus.register(command2, handler2);
    commandBus.unregister(command1);
    expect(commandBus.handlers.has(command1)).toBeFalsy();
    expect(commandBus.handlers.has(command2)).toBeTruthy();
    expect(commandBus.handlers.size).toBe(1);
  });

  it("should execute commands", async () => {
    commandBus.register(command1, handler1);
    commandBus.register(command2, handler2);
    await commandBus.execute(command1);
    await commandBus.execute(command2);
    expect(handler1.execute).toHaveBeenCalledTimes(1);
    expect(handler2.execute).toHaveBeenCalledTimes(1);
    expect(handler1.execute).toHaveBeenCalledWith(command1);
    expect(handler2.execute).toHaveBeenCalledWith(command2);
    expect(commandBus.handlers.size).toBe(2);
    expect(commandBus.handlers.has(command1)).toBeTruthy();
    expect(commandBus.handlers.has(command2)).toBeTruthy();
  });

  it("should throw an error if no handler is registered for the command", () => {
    expect(() => commandBus.execute(command1)).toThrow(
      `No handler for command ${command1}`
    );
  });
});
