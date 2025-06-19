# CQRS (Command Query Responsibility Segregation)

A TypeScript implementation of the CQRS pattern, featuring Command Bus, Query Bus, and Event Bus abstractions.

## Features

- **Command Bus**: Register, unregister, and execute commands with their handlers.
- **Query Bus**: Register and execute queries with their handlers.
- **Event Bus**: Publish and subscribe to events with event handlers.

## Project Structure

```
src/
  @core/
    command/         # CommandBus and interfaces
    event/           # EventBus and interfaces
    query/           # QueryBus and interfaces
  commands/
    create-account.ts            # Example command
    handlers/create-account.handler.ts  # Example command handler
  account.ts                     # Example domain entity
```

## Usage

- Define commands, queries, and events by implementing the respective interfaces.
- Register handlers with the buses.
- Execute commands/queries or publish events as needed.

## Scripts

- `npm test` — Run tests with Jest

## Development

- Written in TypeScript
- Uses Jest for testing

## Author

Ricardo Pires (<ricardo.tech@live.com>)

## License

MIT
