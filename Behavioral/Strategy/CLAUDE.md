# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Strategy Pattern

**Demo:** Payment methods — user selects Credit Card, PayPal, or Bank Transfer; each applies a different fee calculation.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Payment` (interface) | Contract: `pay(user): number` — returns the amount after fees |
| `User` | Context — holds `amount`, `securityCode`, `password`; `payment(strategy)` delegates to strategy and updates balance |
| `CreditCardPayment` | Strategy — validates `securityCode`; applies APR fee per day |
| `PaypalPayment` | Strategy — subtracts flat $5 fee |
| `BankPayment` | Strategy — validates `password`; subtracts $3 fee |

### Flow

Client instantiates a `User`, then calls `user.payment(new CreditCardPayment())` (or any other strategy). `User.payment()` passes itself to `strategy.pay(this)`, which reads user properties, calculates the result, and returns the new amount. `User` updates its balance with the return value.

Strategy is selected at runtime — swapping the strategy object changes the fee algorithm with no changes to `User`.
