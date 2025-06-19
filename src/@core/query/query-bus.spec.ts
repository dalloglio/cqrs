import { IQuery, IQueryBus, IQueryHandler } from "./interfaces";
import { QueryBus } from "./query-bus";

describe("QueryBus", () => {
  let query: IQuery;
  let queryHandler: IQueryHandler;
  let queryBus: IQueryBus;

  beforeEach(() => {
    query = {};
    queryHandler = {
      execute: jest.fn(),
    };
    queryBus = new QueryBus();
  });

  it("should register a query for a query handler", () => {
    queryBus.register(query, queryHandler);
    expect(queryBus.handlers.get(query)).toBe(queryHandler);
  });

  it("should execute a query", () => {
    queryBus.register(query, queryHandler);
    queryBus.execute(query);
    expect(queryHandler.execute).toHaveBeenCalledTimes(1);
    expect(queryHandler.execute).toHaveBeenCalledWith(query);
  });

  it("should throw an error if no handler is found", () => {
    expect(() => queryBus.execute(query)).toThrow("Handler not found");
  });
});
