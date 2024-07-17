import { Widget } from "./Widget";

export class DashboardBuilder {
  private widgets: Widget[] = [];

  addWidget(widget: Widget): DashboardBuilder {
    this.widgets.push(widget);
    return this;
  }

  buildDashboard(): string {
    const dashboardContent = this.widgets
      .map((widget) => widget.render())
      .join("");
    return `<div class="dashboard">${dashboardContent}</div>`;
  }
}
