// Template Method Pattern — Abstract Class (template)
// Defines the logging algorithm skeleton; subclasses override hooks without changing the structure.

const logWindow = document?.querySelector(".log");

/**
 * Abstract Class in the Template Method pattern.
 * log() is the template method: it defines the fixed sequence notify → saveLog → highTierNotify.
 * Subclasses (InfoLog, TraceLog, ErrorLog) must implement notify() and may override highTierNotify().
 * They never override log() itself — the algorithm structure is frozen here.
 */
export abstract class LogTemplate {
  /** Template method — defines the invariant logging algorithm; must not be overridden. */
  public log(message: string) {
    this.notify();           // Step 1: abstract hook, must be provided by each subclass
    this.saveLog(message);   // Step 2: concrete shared step, same for all log types
    this.highTierNotify();   // Step 3: optional hook, only ErrorLog provides a real implementation
  }

  /** Concrete step shared by all log types — appends the message to the DOM log list. */
  protected saveLog(message: string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    logWindow?.appendChild(li);
  }

  /** Abstract hook — each subclass prints its own severity label (INFO, TRACE, ERROR). */
  protected abstract notify(): void;

  /** Optional hook with a no-op default; ErrorLog overrides this to trigger a high-priority alert. */
  protected highTierNotify() {}
}
