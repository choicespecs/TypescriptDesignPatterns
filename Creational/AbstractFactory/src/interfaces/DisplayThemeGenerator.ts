import { DisplayContent } from "./DisplayContent";
import { DisplayWindow } from "./DisplayWindow";
import { DisplayNavigation } from "./DisplayNavigation";

export interface DisplayThemeGenerator {
  createNavigation(): DisplayNavigation;
  createWindow(): DisplayWindow;
  createContent(): DisplayContent;
}
