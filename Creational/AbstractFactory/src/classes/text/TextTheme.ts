import { DisplayThemeGenerator } from "../../interfaces/DisplayThemeGenerator";
import { TextNavigation } from "./TextNavigation";
import { TextWindow } from "./TextWindow";
import { TextContent } from "../image/TextContent";

export class TextTheme implements DisplayThemeGenerator {
  createNavigation(): TextNavigation {
    return new TextNavigation();
  }
  createWindow(): TextWindow {
    return new TextWindow();
  }
  createContent(): TextContent {
    return new TextContent();
  }
}
