export interface IQuery {}
export interface IQueryHandler<T extends IQuery = IQuery, R = any> {
  execute(query: T): Promise<R>;
}
export interface IQueryBus {
  handlers: Map<IQuery, IQueryHandler>;
  register(query: IQuery, handler: IQueryHandler): void;
  execute<T extends IQuery = IQuery, R = any>(query: T): Promise<R>;
}
