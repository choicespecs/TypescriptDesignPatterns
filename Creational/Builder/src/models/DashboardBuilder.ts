// Builder Pattern — Director-like Composer
// Accumulates built Widget products and renders them into a combined dashboard HTML string.

import { Widget } from "./Widget";

/**
 * Director-like composer in the Builder pattern.
 * DashboardBuilder collects completed Widget products from WidgetBuilder and assembles
 * them into a single dashboard HTML string via buildDashboard().
 * It does not construct Widgets itself — it only orchestrates their layout.
 */
export class DashboardBuilder {
  private widgets: Widget[] = [];

  /** Adds a fully-built Widget to the dashboard and returns `this` for chaining. */
  addWidget(widget: Widget): DashboardBuilder {
    this.widgets.push(widget);
    return this;
  }

  /** Renders all accumulated widgets into a wrapper div, producing the final HTML. */
  buildDashboard(): string {
    const dashboardContent = this.widgets
      .map((widget) => widget.render()) // Each widget renders its own HTML fragment
      .join("");
    return `<div class="dashboard">${dashboardContent}</div>`;
  }
}
