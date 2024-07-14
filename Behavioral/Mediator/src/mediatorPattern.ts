// Concrete mediator class that manages communication between users.
class ChatRoom implements ChatMediator {
  private users: User[] = [];

  // Register a user with the mediator.
  registerUser(user: User) {
    this.users.push(user);
  }

  // Send a message from one user to another.
  sendMessage(sender: User, receiver: User, message: string) {
    // Handle message logic, such as updating chat history, etc.
    this.updateMessageDisplay(`${sender.name}: ${message}`);
  }

  // Update the chat message display.
  private updateMessageDisplay(message: string) {
    const chatMessages3 = document.querySelectorAll(".chat-messages");
    chatMessages3.forEach((chatMessage) => {
      const childElement = document.createElement("div"); // Example of child element creation
      // Append whatever child element you want
      childElement.textContent = message;
      chatMessage.appendChild(childElement);
    });
  }
}

// Components communicate with a mediator using the mediator
// interface.
abstract class Component {
  protected mediator: ChatMediator;

  constructor(mediator: ChatMediator) {
    this.mediator = mediator;
  }
}

// Concrete components representing users in the chat room.
class UserComponent extends Component {
  private user: User;
  private chatWindowId: string;

  constructor(user: User, chatWindowId: string, mediator: ChatMediator) {
    super(mediator);
    this.user = user;
    this.chatWindowId = chatWindowId;
  }

  // Send a message to another user.
  sendMessage(receiver: User, message: string) {
    this.mediator.sendMessage(this.user, receiver, message);
  }
}

// Usage
const mediator = new ChatRoom();

// Create users
const alice: User = { id: "1", name: "Alice" };
const bob: User = { id: "2", name: "Bob" };

// Register users with the mediator
mediator.registerUser(alice);
mediator.registerUser(bob);

// Create user components
const aliceComponent = new UserComponent(alice, "chat-window-1", mediator);
const bobComponent = new UserComponent(bob, "chat-window-2", mediator);

// Add event listeners for send buttons
document.getElementById("send-button-1")?.addEventListener("click", () => {
  const messageInput = document.getElementById(
    "message-input-1"
  ) as HTMLInputElement;
  const message = messageInput.value.trim();
  if (message !== "") {
    aliceComponent.sendMessage(bob, message);
    messageInput.value = "";
  }
});

document.getElementById("send-button-2")?.addEventListener("click", () => {
  const messageInput = document.getElementById(
    "message-input-2"
  ) as HTMLInputElement;
  const message = messageInput.value.trim();
  if (message !== "") {
    bobComponent.sendMessage(alice, message);
    messageInput.value = "";
  }
});
