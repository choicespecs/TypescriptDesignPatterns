"use strict";
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
});
const form_title = document.forms[0].querySelector('input[name="title"]');
const form_content = document.forms[0].querySelector('input[name="content"]');
const form_font = document.getElementById("font");
const form_widget_background_color = document.forms[0].querySelector('select[name="color"]');
const form_widget_font_color = document.forms[0].querySelector('select[name="font-color"]');
const form_size = document.forms[0].querySelector('input[name="size"]');
const error_display = document.querySelector(".error-display");
const success_display = document.querySelector(".success-display");
const dashboardContainer = document.getElementById("dashboard");
class Widget {
    setTitle(title) {
        this.title = title;
    }
    setContent(content) {
        this.content = content;
    }
    setColor(color) {
        this.widget_color = color;
    }
    setTextAlign(textAlign) {
        this.text_align = textAlign;
    }
    setHeight(height) {
        this.height = height;
    }
    setTextColor(textColor) {
        this.text_color = textColor;
    }
    setFont(font) {
        this.font = font;
    }
    render() {
        return `<div class="widget" style="background-color:${this.widget_color};text-align:${this.text_align};height:${this.height}px;color:${this.text_color};font-family:${this.font}">
                    <h2>${this.title}</h2>
                    <p>${this.content}</p>
                    </div>`;
    }
}
class WidgetBuilder {
    constructor() {
        this.widget = new Widget();
    }
    setTitle(title) {
        this.widget.setTitle(title);
        return this;
    }
    setContent(content) {
        this.widget.setContent(content);
        return this;
    }
    setColor(color) {
        this.widget.setColor(color);
        return this;
    }
    setTextAlign(textAlign) {
        this.widget.setTextAlign(textAlign);
        return this;
    }
    setHeight(height) {
        this.widget.setHeight(height);
        return this;
    }
    setTextColor(color) {
        this.widget.setTextColor(color);
        return this;
    }
    setFont(font) {
        this.widget.setFont(font);
        return this;
    }
    build() {
        return this.widget;
    }
}
class DashboardBuilder {
    constructor() {
        this.widgets = [];
    }
    addWidget(widget) {
        this.widgets.push(widget);
        return this;
    }
    buildDashboard() {
        const dashboardContent = this.widgets.map(widget => widget.render()).join('');
        return `<div class="dashboard">${dashboardContent}</div>`;
    }
}
const dashboardBuilder = new DashboardBuilder();
function cleanInput() {
    form_title.value = "";
    form_content.value = "";
    form_font.selectedIndex = 0;
    form_widget_background_color.selectedIndex = 0;
    form_widget_font_color.selectedIndex = 0;
    form_size.value = "";
}
function myFunction() {
    const widgetBuilder = new WidgetBuilder();
    const form_text_align_radio = document.forms[0].querySelector('input[type="radio"][name="text_align"]:checked');
    let allFieldsFilled = true;
    let radioSelected = false;
    const formElements = form.elements;
    for (const element of formElements) {
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
            if (!element.value.trim()) {
                allFieldsFilled = false;
                break;
            }
        }
        if (element instanceof HTMLInputElement && element.type === "radio" && element.checked) {
            radioSelected = true;
        }
    }
    if (!allFieldsFilled && !radioSelected) {
        error_display.style.display = "block";
        success_display.style.display = "none";
        return;
    }
    else {
        error_display.style.display = "none";
        success_display.style.display = "block";
        const widget = new WidgetBuilder()
            .setTitle(form_title.value)
            .setContent(form_content.value)
            .setFont(form_font.value)
            .setColor(form_widget_background_color.value)
            .setTextColor(form_widget_font_color.value)
            .setHeight(form_size.value)
            .setTextAlign(form_text_align_radio.value)
            .build();
        cleanInput();
        form_text_align_radio.checked = false;
        const customizableDashboard = dashboardBuilder.addWidget(widget).buildDashboard();
        dashboardContainer.innerHTML = "";
        dashboardContainer.innerHTML = customizableDashboard;
    }
}
