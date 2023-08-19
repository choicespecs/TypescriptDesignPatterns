"use strict";
class Widget {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    render() {
        return `<div class="widget">
                    <h2>${this.title}</h2>
                    <p>${this.content}</p>
                    </div>`;
    }
}
class DashboardBuilder {
    constructor() {
        this.widgets = [];
    }
    addWidget(title, content) {
        this.widgets.push(new Widget(title, content));
        return this;
    }
    buildDashboard() {
        const dashboardContent = this.widgets.map(widget => widget.render()).join('');
        return `<div class="dashboard">${dashboardContent}</div>`;
    }
}
const dashboardBuilder = new DashboardBuilder();
const customizableDashboard = dashboardBuilder
    .addWidget('Sales Overview', 'View sales data for the past month.')
    .addWidget('User Engagement', 'Analyze user engagement metrics.')
    .addWidget('Website Traffic', 'Monitor website traffic trends.')
    .buildDashboard();
const dashboardContainer = document.getElementById("dashboard");
if (dashboardContainer) {
    dashboardContainer.innerHTML = customizableDashboard;
}
