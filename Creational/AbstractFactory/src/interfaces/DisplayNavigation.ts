// Abstract Factory Pattern — AbstractProduct interface (Navigation)
// Implemented by TextNavigation and ImageNavigation to define the navigation component contract.

/**
 * AbstractProduct interface for the Navigation component.
 * TextNavigation and ImageNavigation implement display() with theme-specific styles.
 */
export interface DisplayNavigation {
  /** Renders the navigation bar with this theme's specific colour and height. */
  display(): void;
}
