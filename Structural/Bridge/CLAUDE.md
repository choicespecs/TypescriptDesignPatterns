# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Bridge Pattern

**Demo:** Notification system — notification type (Email, SMS) and display method (Toast, Modal) are independent hierarchies combined at runtime via a bridge.

### Class Roles

| Class/Interface | Role |
|---|---|
| `SampleNotification` (interface) | Abstraction: `send(message)` |
| `NotificationDisplay` (interface) | Implementation: `display(message)` |
| `EmailNotification` | Concrete abstraction — sends email (logs to console) |
| `SMSNotification` | Concrete abstraction — sends SMS (logs to console) |
| `ToastNotificationDisplay` | Concrete implementation — auto-dismissing toast UI |
| `ModalNotificationDisplay` | Concrete implementation — modal dialog UI |
| `NotificationBridge` | Bridge — composes one `SampleNotification` + one `NotificationDisplay`; `sendAndDisplay()` calls both |

### Flow

Client creates `new NotificationBridge(new EmailNotification(), new ToastNotificationDisplay())` and calls `sendAndDisplay(message)`. The bridge calls `notification.send()` and `display.display()` independently. Changing either side requires no change to the other — 2 notification types × 2 display types = 4 combinations without 4 subclasses.
