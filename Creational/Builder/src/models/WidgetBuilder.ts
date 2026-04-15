// Builder Pattern — ConcreteBuilder
// Constructs a Widget step by step; each setter delegates to the Widget and returns `this`
// for fluent chaining, ending with build() to hand over the completed product.

import { Builder } from "../interfaces/Builder";
import { Widget } from "./Widget";

/**
 * ConcreteBuilder in the Builder pattern.
 * Each setter configures the internal Widget product and returns `this` to allow
 * method chaining. build() finalises construction and returns the assembled Widget.
 */
export class WidgetBuilder implements Builder {
  private widget: Widget;

  constructor() {
    this.widget = new Widget(); // Create the blank product that will be configured step by step
  }

  public setTitle(title: string): this {
    this.widget.setTitle(title);
    return this; // Return builder for chaining
  }

  public setContent(content: string): this {
    this.widget.setContent(content);
    return this;
  }

  public setColor(color: string): this {
    this.widget.setColor(color);
    return this;
  }

  public setTextAlign(textAlign: string): this {
    this.widget.setTextAlign(textAlign);
    return this;
  }

  public setHeight(height: string): this {
    this.widget.setHeight(height);
    return this;
  }

  public setTextColor(color: string): this {
    this.widget.setTextColor(color);
    return this;
  }

  public setFont(font: string): this {
    this.widget.setFont(font);
    return this;
  }

  /** Finalises the build step and returns the fully configured Widget product. */
  public build(): Widget {
    return this.widget;
  }
}
