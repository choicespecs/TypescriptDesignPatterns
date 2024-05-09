const form = document.querySelector('form') as HTMLFormElement;
form?.addEventListener('submit', (e) => {
    e.preventDefault();
})

const form_title = document.forms[0].querySelector('input[name="title"]') as HTMLInputElement;
const form_content = document.forms[0].querySelector('input[name="content"]') as HTMLInputElement;
const form_font = document.getElementById("font") as HTMLSelectElement;
const form_widget_background_color = document.forms[0].querySelector('select[name="color"]') as HTMLSelectElement;
const form_widget_font_color = document.forms[0].querySelector('select[name="font-color"]') as HTMLSelectElement;
const form_size = document.forms[0].querySelector('input[name="size"]') as HTMLInputElement;

const error_display = document.querySelector(".error-display") as HTMLDivElement;
const success_display = document.querySelector(".success-display") as HTMLDivElement;

const dashboardContainer = document.getElementById("dashboard") as HTMLDivElement;

class Widget {

    private title: string;
    private content: string;
    private widget_color : string;
    private text_color : string;
    private text_align : string;
    private font : string;
    private height : string;

    setTitle(title: string) : void {
        this.title = title;
    }

    setContent(content: string) : void {
        this.content = content;
    }

    setColor(color: string) : void {
        this.widget_color = color;
    }

    setTextAlign(textAlign: string) : void {
        this.text_align = textAlign;
    }

    setHeight(height: string) : void {
        this.height = height;
    }

    setTextColor(textColor: string) : void {
        this.text_color = textColor;
    }

    setFont(font: string) : void {
        this.font = font;
    }

    render(): string {
        return `<div class="widget" style="background-color:${this.widget_color};text-align:${this.text_align};height:${this.height}px;color:${this.text_color};font-family:${this.font}">
                    <h2>${this.title}</h2>
                    <p>${this.content}</p>
                    </div>`;
    }
}

interface Builder {
    setTitle(title : string) : this;
    setContent(content : string) : this; 
    setColor(color: string) : this;
    setTextAlign(text_align: string) : this;
    setHeight(height: string) : this;
    setTextColor(color: string) : this;
    setFont(font: string) : this;
}

class WidgetBuilder implements Builder {
    private widget : Widget;

    constructor() {
        this.widget = new Widget();
    }

    public setTitle(title : string) : this {
        this.widget.setTitle(title)
        return this;
    }

    public setContent(content: string) : this {
        this.widget.setContent(content);
        return this;
    }

    public setColor(color: string) : this {
        this.widget.setColor(color);
        return this;
    }
    
    public setTextAlign(textAlign: string) : this {
        this.widget.setTextAlign(textAlign);
        return this;
    }

    public setHeight(height: string) : this {
        this.widget.setHeight(height);
        return this;
    }

    public setTextColor(color: string) : this {
        this.widget.setTextColor(color);
        return this;
    }

    public setFont(font: string) : this {
        this.widget.setFont(font);
        return this;
    }

    public build() : Widget {
        return this.widget;
    }
}
    

class DashboardBuilder {
    private widgets: Widget[] = [];

    addWidget(widget: Widget) : DashboardBuilder {
        this.widgets.push(widget);
        return this;
    }

    buildDashboard(): string {
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
    const form_text_align_radio = document.forms[0].querySelector('input[type="radio"][name="text_align"]:checked') as HTMLInputElement;

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
    } else {
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
