import { User } from "./User";

export interface ChatMediator {
  sendMessage(sender: User, receiver: User, message: string): void;
}
