import { IEvent, IEventBus, IEventHandler } from "./interfaces";

export class EventBus implements IEventBus {
  readonly events: Map<IEvent, IEventHandler[]>;

  constructor() {
    this.events = new Map();
  }

  publish(event: IEvent): void {
    const eventName = event && event.constructor && event.constructor.name;
    if (!eventName) return;
    const handlers = this.events.get(eventName);
    if (!handlers) return;
    handlers.forEach((handler) => handler.handle(event));
  }

  subscribe(event: IEvent, handler: IEventHandler): void {
    this.events.set(event.constructor.name, [
      ...(this.events.get(event.constructor.name) || []),
      handler,
    ]);
  }
}
