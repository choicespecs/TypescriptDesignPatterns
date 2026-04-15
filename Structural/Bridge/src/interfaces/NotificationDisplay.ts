// Bridge Pattern — Implementation interface
// The other side of the bridge: defines the visual display contract.

/**
 * Implementation interface in the Bridge pattern.
 * ToastNotificationDisplay and ModalNotificationDisplay are Concrete Implementations.
 * NotificationBridge composes one SampleNotification + one NotificationDisplay,
 * so any combination of send-channel and display-style can be assembled at runtime.
 */
export interface NotificationDisplay {
  /** Renders the message in this implementation's style (toast, modal, etc.). */
  display(message: string): void;
}
