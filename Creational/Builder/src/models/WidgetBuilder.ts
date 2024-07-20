import { Builder } from "../interfaces/Builder";
import { Widget } from "./Widget";

export class WidgetBuilder implements Builder {
  private widget: Widget;

  constructor() {
    this.widget = new Widget();
  }

  public setTitle(title: string): this {
    this.widget.setTitle(title);
    return this;
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

  public build(): Widget {
    return this.widget;
  }
}
