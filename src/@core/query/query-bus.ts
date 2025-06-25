import { IQuery, IQueryBus, IQueryHandler } from "./interfaces";

export class QueryBus implements IQueryBus {
  handlers: Map<Function, IQueryHandler<IQuery, any>>;

  constructor() {
    this.handlers = new Map();
  }

  register(queryType: Function, handler: IQueryHandler<IQuery, any>): void {
    this.handlers.set(queryType, handler);
  }

  execute<T extends IQuery = IQuery, R = any>(query: T): Promise<R> {
    const handler = this.handlers.get(query.constructor);
    if (!handler) throw new Error("Handler not found");
    return handler.execute(query);
  }
}
