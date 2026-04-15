// Abstract Factory Pattern — AbstractProduct interface (Window)
// Implemented by TextWindow and ImageWindow to define the window component contract.

/**
 * AbstractProduct interface for the Window component.
 * TextWindow and ImageWindow implement display() with theme-specific background and sizing.
 */
export interface DisplayWindow {
  /** Renders the window area with this theme's specific dimensions and colour. */
  display(): void;
}
