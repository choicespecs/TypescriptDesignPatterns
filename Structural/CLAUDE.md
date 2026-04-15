# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Structural Patterns

Structural patterns deal with object composition and relationships. Each subdirectory is a standalone TypeScript/webpack demo runnable in the browser (`npm install && npm start`).

| Pattern | Demo Scenario | Core Idea |
|---|---|---|
| Adapter | Media player (YouTube/MP4/txt) | MediaAdapter wraps AdvancedMediaPlayer to satisfy the MediaPlayer interface |
| Bridge | Notification system | Decouples notification type (Email/SMS) from display method (Toast/Modal) via NotificationBridge |
| Composite | Store inventory pricing | Product (leaf) and Store (composite) both implement `getPrice()`; Store sums its Products |
| Decorator | Weapon upgrade system | Sword is wrapped by DamageUpgrade/ModUpgrade/SpecialUpgrade decorators in any combination |
| Facade | Calculator with tax logic | CalculatorFacade hides Add/Subtract/Divide/Multiply instances behind simple public methods |
| Flyweight | Product catalog images | ImageFactory caches HTMLImageElements by URL; products share instances from the cache |
| Proxy | Database write access control | ProtectionProxyDatabaseAccess checks user.writeAccess before delegating to RealDatabaseAccess |
