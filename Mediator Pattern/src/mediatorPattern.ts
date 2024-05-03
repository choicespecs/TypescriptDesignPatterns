// The mediator interface declares a method used by components
// to notify the mediator about various events. The mediator may
// react to these events and pass the execution to other
// components.
interface ChatMediator {
  notify(sender: Component, event: string, data?: any): void;
}

// Concrete mediator class that manages communication between components.
class ChatRoom implements ChatMediator {
  private components: Component[] = [];

  notify(sender: Component, event: string, data?: any) {
    if (sender instanceof ChatInput && event === "send") {
      const message = data;
      this.sendMessage(message);
    } else if (
      sender instanceof NotificationButton &&
      event === "notificationClicked"
    ) {
      this.handleNotification();
    }
  }

  registerComponent(component: Component) {
    this.components.push(component);
  }

  sendMessage(message: string) {
    console.log(`Message sent: ${message}`);
    this.updateMessageDisplay(`You: ${message}`);
  }

  updateMessageDisplay(message: string) {
    console.log(`Message displayed: ${message}`);
    // For demonstration, let's assume this method updates the UI to display the message
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatMessages?.appendChild(messageElement);
  }

  handleNotification() {
    console.log("Notification button clicked");
    // Handle notification logic
  }
}

// Components communicate with a mediator using the mediator
// interface. Thanks to that, you can use the same components in
// other contexts by linking them with different mediator
// objects.
abstract class Component {
  protected mediator: ChatMediator;

  constructor(mediator: ChatMediator) {
    this.mediator = mediator;
  }

  abstract click(): void;
}

// Concrete components don't talk to each other. They have only
// one communication channel, which is sending notifications to
// the mediator.
class ChatInput extends Component {
  private messageInput: HTMLInputElement;
  private sendButton: HTMLButtonElement;

  constructor(mediator: ChatMediator) {
    super(mediator);
    this.messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    this.sendButton = document.getElementById(
      "send-button"
    ) as HTMLButtonElement;
    this.sendButton.addEventListener("click", this.click.bind(this));
  }

  click() {
    this.sendMessage();
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message !== "") {
      this.mediator.notify(this, "send", message);
      this.messageInput.value = "";
    }
  }
}

class NotificationButton extends Component {
  private button: HTMLButtonElement;

  constructor(mediator: ChatMediator) {
    super(mediator);
    this.button = document.getElementById(
      "notification-button"
    ) as HTMLButtonElement;
    this.button.addEventListener("click", this.click.bind(this));
  }

  click() {
    this.mediator.notify(this, "notificationClicked");
  }
}

// Usage
const mediator = new ChatRoom();
const chatInput = new ChatInput(mediator);
const notificationButton = new NotificationButton(mediator);

// Register the components with the mediator
mediator.registerComponent(chatInput);
mediator.registerComponent(notificationButton);
