class Widget {

    constructor(private title: string, private content: string) {}

    render(): string {
        return `<div class="widget">
                    <h2>${this.title}</h2>
                    <p>${this.content}</p>
                    </div>`;
    }
}

class DashboardBuilder {
    private widgets: Widget[] = [];

    addWidget(title: string, content: string) : DashboardBuilder {
        this.widgets.push(new Widget(title, content));
        return this;
    }

    buildDashboard(): string {
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
