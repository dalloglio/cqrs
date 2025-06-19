import { EventBus } from "./event-bus";
import { IEvent, IEventBus, IEventHandler } from "./interfaces";

describe("EventBus", () => {
  let event1: IEvent;
  let event2: IEvent;
  let eventHandler1: IEventHandler;
  let eventHandler2: IEventHandler;
  let eventHandler3: IEventHandler;
  let eventBus: IEventBus;

  beforeEach(() => {
    event1 = {};
    event2 = {};
    eventHandler1 = {
      handle: jest.fn(),
    };
    eventHandler2 = {
      handle: jest.fn(),
    };
    eventHandler3 = {
      handle: jest.fn(),
    };
    eventBus = new EventBus();
  });

  it("should subscribe event handlers to events", () => {
    eventBus.subscribe(event1, eventHandler1);
    eventBus.publish(event1);
    expect(eventHandler1.handle).toHaveBeenCalledWith(event1);

    eventBus.subscribe(event2, eventHandler2);
    eventBus.subscribe(event2, eventHandler3);
    eventBus.publish(event2);
    expect(eventHandler2.handle).toHaveBeenCalledWith(event2);
    expect(eventHandler3.handle).toHaveBeenCalledWith(event2);
  });

  it("should not publish event if there is no one event handler subscribed", () => {
    eventBus.publish(event1);
    expect(eventHandler1.handle).not.toHaveBeenCalled();
    expect(eventHandler2.handle).not.toHaveBeenCalled();
    expect(eventHandler3.handle).not.toHaveBeenCalled();
  });
});
