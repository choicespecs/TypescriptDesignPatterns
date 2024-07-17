import { WidgetBuilder } from "./models/WidgetBuilder";
import { DashboardBuilder } from "./models/DashboardBuilder";

const form = document.querySelector("form") as HTMLFormElement;
form?.addEventListener("submit", (e) => {
  e.preventDefault();
});

const form_title = document.forms[0].querySelector(
  'input[name="title"]'
) as HTMLInputElement;
const form_content = document.forms[0].querySelector(
  'input[name="content"]'
) as HTMLInputElement;
const form_font = document.getElementById("font") as HTMLSelectElement;
const form_widget_background_color = document.forms[0].querySelector(
  'select[name="color"]'
) as HTMLSelectElement;
const form_widget_font_color = document.forms[0].querySelector(
  'select[name="font-color"]'
) as HTMLSelectElement;
const form_size = document.forms[0].querySelector(
  'input[name="size"]'
) as HTMLInputElement;

const error_display = document.querySelector(
  ".error-display"
) as HTMLDivElement;
const success_display = document.querySelector(
  ".success-display"
) as HTMLDivElement;

const dashboardContainer = document.getElementById(
  "dashboard"
) as HTMLDivElement;

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
  const form_text_align_radio = document.forms[0].querySelector(
    'input[type="radio"][name="text_align"]:checked'
  ) as HTMLInputElement;

  let allFieldsFilled = true;
  let radioSelected = false;
  const formElements = form.elements;

  for (const element of formElements) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement
    ) {
      if (!element.value.trim()) {
        allFieldsFilled = false;
        break;
      }
    }
    if (
      element instanceof HTMLInputElement &&
      element.type === "radio" &&
      element.checked
    ) {
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

    const customizableDashboard = dashboardBuilder
      .addWidget(widget)
      .buildDashboard();

    dashboardContainer.innerHTML = "";
    dashboardContainer.innerHTML = customizableDashboard;
  }
}
