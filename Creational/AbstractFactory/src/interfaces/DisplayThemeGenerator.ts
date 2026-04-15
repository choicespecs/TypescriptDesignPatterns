// Abstract Factory Pattern — AbstractFactory interface
// Defines the factory contract for creating a coordinated family of UI theme products.

import { DisplayContent } from "./DisplayContent";
import { DisplayWindow } from "./DisplayWindow";
import { DisplayNavigation } from "./DisplayNavigation";

/**
 * AbstractFactory interface in the Abstract Factory pattern.
 * TextTheme and ImageTheme implement this to produce their respective families
 * of products (Navigation, Window, Content) without the client knowing the concrete types.
 */
export interface DisplayThemeGenerator {
  /** Factory method for the navigation component of this theme family. */
  createNavigation(): DisplayNavigation;
  /** Factory method for the window component of this theme family. */
  createWindow(): DisplayWindow;
  /** Factory method for the content component of this theme family. */
  createContent(): DisplayContent;
}
