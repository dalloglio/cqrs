import { IQuery, IQueryBus, IQueryHandler } from "./interfaces";

export class QueryBus implements IQueryBus {
  handlers: Map<IQuery, IQueryHandler<IQuery, any>>;

  constructor() {
    this.handlers = new Map();
  }

  register(query: IQuery, handler: IQueryHandler<IQuery, any>): void {
    this.handlers.set(query, handler);
  }

  execute<T extends IQuery = IQuery, R = any>(query: T): Promise<R> {
    const handler = this.handlers.get(query);
    if (!handler) throw new Error("Handler not found");
    return handler.execute(query);
  }
}
