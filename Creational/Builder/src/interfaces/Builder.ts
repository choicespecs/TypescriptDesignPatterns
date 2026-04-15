// Builder Pattern — Builder interface
// Fluent contract for constructing Widget products step by step.

/**
 * Builder interface in the Builder pattern.
 * Every setter returns `this` to enable method chaining (fluent interface).
 * WidgetBuilder is the ConcreteBuilder that implements this contract to assemble a Widget product.
 */
export interface Builder {
  setTitle(title: string): this;
  setContent(content: string): this;
  setColor(color: string): this;
  setTextAlign(text_align: string): this;
  setHeight(height: string): this;
  setTextColor(color: string): this;
  setFont(font: string): this;
}
