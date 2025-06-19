export interface IEvent {}
export interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}
export interface IEventBus {
  events: Map<IEvent, IEventHandler[]>;
  publish(event: IEvent): void;
  subscribe(event: IEvent, handler: IEventHandler): void;
}
