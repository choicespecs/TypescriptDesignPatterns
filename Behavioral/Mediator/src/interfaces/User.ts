// Mediator Pattern — Shared data type
// Plain data object representing a chat participant; passed to the mediator for routing.

/** Identifies a chat participant; used by ChatMediator to address messages. */
export interface User {
  id: string;
  name: string;
}
