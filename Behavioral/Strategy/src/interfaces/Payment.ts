import { User } from "../models/User";

// Payment.ts
export interface Payment {
  pay(user: User): number;
}
