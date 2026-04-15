# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Builder Pattern

**Demo:** Dashboard widget configurator — user sets title, content, colors, font, height, and alignment step-by-step, then adds the widget to a dashboard.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Builder` (interface) | Fluent contract: `setTitle()`, `setContent()`, `setColor()`, `setTextColor()`, `setFont()`, `setHeight()`, `setTextAlign()` — all return `this` |
| `Widget` | Product — holds all style/content properties; `render()` returns a styled HTML `<div>` string |
| `WidgetBuilder` | Concrete builder — each setter delegates to internal `Widget` and returns `this`; `build()` returns the configured `Widget` |
| `DashboardBuilder` | Director-like composer — holds `Widget[]`; `addWidget()` pushes and chains; `buildDashboard()` renders all widgets as combined HTML |

### Flow

```
new WidgetBuilder()
  .setTitle("...")
  .setColor("...")
  .setHeight("...")
  .build()           → Widget
```

`DashboardBuilder.addWidget(widget).buildDashboard()` concatenates `widget.render()` calls and injects the result into the DOM.
