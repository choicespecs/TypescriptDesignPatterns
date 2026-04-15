// Chain of Responsibility Pattern — Shared data type
// Carries the form field values passed through every handler in the chain.

/**
 * Shared data object threaded through the entire validation chain.
 * Each handler reads only the field it is responsible for validating.
 */
interface ValidationInput {
  username: string;
  email: string;
  password: string;
}

export default ValidationInput;
