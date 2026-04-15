// Bridge Pattern — Implementation interface
// The other side of the bridge: defines the visual display contract.

/**
 * Implementation interface in the Bridge pattern.
 * ToastNotificationDisplay and ModalNotificationDisplay are Concrete Implementations.
 * NotificationBridge composes one SampleNotification + one NotificationDisplay,
 * so any combination of send-channel and display-style can be assembled at runtime.
 */
export interface NotificationDisplay {
  /** Renders the message in this implementation's style.
   *  channel is passed from the Abstraction side via the bridge so each
   *  display variant can apply channel-specific styling (icon, accent colour, metadata). */
  display(message: string, channel: 'email' | 'sms'): void;
}
