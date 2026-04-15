// Builder Pattern — Product
// The complex object assembled by WidgetBuilder; render() produces the final HTML string.

/**
 * Product in the Builder pattern.
 * Widget stores all configurable style and content properties.
 * Clients never construct a Widget directly — they always use WidgetBuilder to set
 * each property and call build() to receive the completed product.
 */
export class Widget {
  private title: string;
  private content: string;
  private widget_color: string;
  private text_color: string;
  private text_align: string;
  private font: string;
  private height: string;

  setTitle(title: string): void {
    this.title = title;
  }

  setContent(content: string): void {
    this.content = content;
  }

  setColor(color: string): void {
    this.widget_color = color;
  }

  setTextAlign(textAlign: string): void {
    this.text_align = textAlign;
  }

  setHeight(height: string): void {
    this.height = height;
  }

  setTextColor(textColor: string): void {
    this.text_color = textColor;
  }

  setFont(font: string): void {
    this.font = font;
  }

  /** Converts all accumulated properties into an inline-styled HTML widget string. */
  render(): string {
    return `<div class="widget" style="background-color:${this.widget_color};text-align:${this.text_align};height:${this.height}px;color:${this.text_color};font-family:${this.font}">
                    <h2>${this.title}</h2>
                    <p>${this.content}</p>
                    </div>`;
  }
}
