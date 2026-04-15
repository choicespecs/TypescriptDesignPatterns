# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Creational Patterns

Creational patterns deal with object creation mechanisms. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

| Pattern | Demo Scenario | Core Idea |
|---|---|---|
| AbstractFactory | UI theme switcher (Text vs Image) | Two theme factories each create a coordinated family of Navigation/Window/Content components |
| Builder | Dashboard widget configurator | WidgetBuilder chains setters fluently; DashboardBuilder composes multiple widgets into HTML |
| FactoryMethod | HTTP response page renderer | Factory selects concrete WebPage subclass based on response code (200/404/503/511) |
| Prototype | Menu item cloning | `MenuItem.clone()` produces shallow copies; clones are then customized with different labels/links |
