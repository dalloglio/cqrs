import { IQuery, IQueryBus, IQueryHandler } from "./interfaces";
import { QueryBus } from "./query-bus";

describe("QueryBus", () => {
  class MockQuery implements IQuery {}
  class AnotherMockQuery implements IQuery {}

  let queryBus: IQueryBus;
  let queryHandler: IQueryHandler;
  let anotherQueryHandler: IQueryHandler;

  beforeEach(() => {
    queryBus = new QueryBus();
    queryHandler = { execute: jest.fn() };
    anotherQueryHandler = { execute: jest.fn() };
  });

  it("should register a query for a query handler", () => {
    queryBus.register(MockQuery, queryHandler);
    expect(queryBus.handlers.get(MockQuery)).toBe(queryHandler);
  });

  it("should execute a query", () => {
    queryBus.register(MockQuery, queryHandler);
    const query = new MockQuery();
    queryBus.execute(query);
    expect(queryHandler.execute).toHaveBeenCalledTimes(1);
    expect(queryHandler.execute).toHaveBeenCalledWith(query);
  });

  it("should throw an error if no handler is found", () => {
    const query = new MockQuery();
    expect(() => queryBus.execute(query)).toThrow("Handler not found");
  });

  it("should overwrite handler if registering the same query twice", async () => {
    queryBus.register(MockQuery, queryHandler);
    const newHandler = { execute: jest.fn() };
    queryBus.register(MockQuery, newHandler);
    const query = new MockQuery();
    await queryBus.execute(query);
    expect(newHandler.execute).toHaveBeenCalled();
    expect(queryHandler.execute).not.toHaveBeenCalled();
  });

  it("should propagate error if handler throws during execution", async () => {
    const errorHandler: IQueryHandler = { execute: jest.fn(() => { throw new Error("fail"); }) };
    queryBus.register(MockQuery, errorHandler);
    const query = new MockQuery();
    await expect(() => queryBus.execute(query)).toThrow("fail");
  });
});
