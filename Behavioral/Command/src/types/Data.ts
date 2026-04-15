// Command Pattern — Shared data type
// Represents a single database record passed to and carried by every Command.

/** A single database record. Commands store this so undo() can reference the same data. */
export type Data = {
  id: number;
  username: string;
  information: string;
};
