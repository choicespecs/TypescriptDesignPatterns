// Command Pattern — Command interface
// Defines the two operations every command object must expose: do and undo.

/**
 * Command interface in the Command pattern.
 * ConcreteCommands (InsertDatabase, DeleteDatabase) implement this so the
 * Invoker (DatabaseApplication) can execute and undo operations without knowing
 * what those operations are.
 */
export interface Command {
  /** Performs the encapsulated operation on the Receiver. */
  execute(): any;
  /** Reverses the encapsulated operation on the Receiver. */
  undo(): any;
}
