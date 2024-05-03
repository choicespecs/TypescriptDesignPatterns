// The mediator interface declares a method used by components
// to notify the mediator about various events. The mediator may
// react to these events and pass the execution to other
// components.
interface ChatMediator {
  sendMessage(message: string): void;
  sendNotification(): void;
}

// Concrete mediator class that manages communication between components.
class ChatRoom implements ChatMediator {
  private components: Component[] = [];

  // Register a component with the mediator.
  registerComponent(component: Component) {
    this.components.push(component);
  }

  // Send a message to be displayed in the chat.
  sendMessage(message: string) {
    console.log(`Message sent: ${message}`);
    this.updateMessageDisplay(`You: ${message}`);
    // Trigger notification when a message is sent
    this.sendNotification();
  }

  // Trigger a notification.
  sendNotification() {
    console.log("Notification triggered");
    this.notifyComponents("notificationTriggered");
    // Handle notification logic
  }

  // Notify all components about an event.
  private notifyComponents(event: string, data?: any) {
    this.components.forEach((component) => {
      component.notify(event, data);
    });
  }

  // Update the chat message display.
  private updateMessageDisplay(message: string) {
    console.log(`Message displayed: ${message}`);
    // For demonstration, let's assume this method updates the UI to display the message
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatMessages?.appendChild(messageElement);
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

  // Notify the mediator about an event.
  notify(event: string, data?: any) {
    // Components can react to specific events if needed
  }
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
    this.sendButton.addEventListener("click", this.sendMessage.bind(this));
  }

  // User clicks send button to send a message.
  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message !== "") {
      this.mediator.sendMessage(message);
      this.messageInput.value = "";
    }
  }

  // Handle events relevant to ChatInput.
  notify(event: string, data?: any) {
    if (event === "messageReceived") {
      // Handle message received event
      console.log(`Message received: ${data}`);
    }
    // Add other event handling as needed
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

  // User clicks notification button.
  click() {
    console.log("Notification button clicked");
    // Handle notification button click
  }

  // React to the notificationTriggered event.
  notify(event: string, data?: any) {
    if (event === "notificationTriggered") {
      this.showNotification();
    }
  }

  // Show a notification.
  private showNotification() {
    console.log("Notification shown");
    // Handle notification display
  }
}

// Usage
const mediator = new ChatRoom();
const chatInput = new ChatInput(mediator);
const notificationButton = new NotificationButton(mediator);

// Register the components with the mediator
mediator.registerComponent(chatInput);
mediator.registerComponent(notificationButton);
