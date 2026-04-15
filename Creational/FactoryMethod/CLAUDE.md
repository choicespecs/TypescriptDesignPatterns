# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Factory Method Pattern

**Demo:** HTTP response page renderer — different response codes (200, 404, 503, 511) produce different page types via a factory hierarchy.

### Class Roles

| Class | Role |
|---|---|
| `WebPage` (abstract) | Product base — holds DOM element refs; provides `displayImage()` + `displayArticle()` helpers; declares abstract `display()` |
| `WebPageGenerator` (abstract) | Creator base — declares abstract `createWebPage(response)` returning `WebPage` |
| `ContentWebPageResponse` | Concrete factory — creates `DefaultWebPage` (404) or `ContentWebPage` (200) |
| `SecurityWebPageResponse` | Concrete factory — creates `SecurityWebPage` (511) or `ServiceWebPage` (503); logs incidents |
| `DefaultWebPage` | 404 — displays default image/article |
| `ContentWebPage` | 200 — displays response content |
| `SecurityWebPage` | 511 — displays stop image and "Cannot access" message |
| `ServiceWebPage` | 503 — displays response content/article |

### Flow

A delegating `HTTPWebResponse` function routes to either `ContentWebPageResponse` or `SecurityWebPageResponse` based on the response code. The chosen factory calls `createWebPage(response)` and returns the appropriate `WebPage` subclass, which is then told to `display()`.
