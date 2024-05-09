# Chain Of Responsibility Pattern

> Decouples sender and receiver by allowing multiple objects to handle a request, with each object either processing it or passing it to the next handler in the chain.

The Chain of Responsibility design pattern is a behavioral pattern that allows multiple objects to handle a request without the sender needing to know which object will ultimately process it. In this pattern, each handler contains a reference to the next handler in the chain. When a request is made, it is passed along the chain until one of the handlers handles it or until the end of the chain is reached. This promotes loose coupling between senders and receivers, as any handler can be added, removed, or reordered without affecting the client code. Typically, the Chain of Responsibility is used when there are multiple objects that can handle a request, and the specific handler is not known at compile-time. This pattern is often seen in event handling systems, middleware components, and logging frameworks where the processing of a request involves several steps or stages, and any one of them might handle the request.

Imagine you're developing an application where various authentication methods are required, such as username/password, biometric, or social media login. Instead of hardcoding the logic for each authentication method directly into your application, you can implement the Chain of Responsibility pattern.

In this scenario, you would create a series of authentication handler objects, each responsible for a specific authentication method. For instance, you might have a UsernamePasswordHandler, BiometricHandler, and SocialMediaHandler. Each handler contains logic to process the authentication request. If one handler cannot handle the request (e.g., the user chooses biometric authentication, but the device doesn't support it), it passes the request to the next handler in the chain. This chain will start with one handler such as the UsernamePasswordHandler and continue down until one handler can complete the process of the request.

The chain can be configured dynamically, allowing for easy addition or removal of authentication methods without modifying existing code. For instance, if a new authentication method like two-factor authentication is introduced, you can simply add a TwoFactorAuthHandler to the chain. This flexibility and extensibility make the Chain of Responsibility pattern valuable in scenarios where there are multiple, interchangeable ways to handle a request, and the specific handler is determined at runtime based on the context or conditions.

## Application

- More than one object may handle a request, and the handler isn't known from _a priori_. The handler should be ascertained automatically.
- You want to issue a request to one of several objects without specifying the receiver explicitly
- The set of objects that can handle a request should be specified dynamically.

## Definitions

**Handler**
: defined an interface for handling requests. Can also implement the successor link.

**Concrete Handler**
: handles requests it is responsible for. Can access it's successor. If the Concrete Handler can handle the request it will do so, else it will forward the request to its successor.

**Client**
: initiates the request to a Concrete Handler object on the chain.

## Consequences

1. _Order dependency_
   : The behavior of the chain can be highly dependent on the order of handlers. Changes to the order of handlers within the chain may inadvertently alter the system's behavior, leading to unintended consequences. Maintaining the correct order of handlers can become a maintenance challenge, especially as the system evolves over time.

2. _Potential for infinite loops_
   : If the chain is not properly designed or if there are circular dependencies between handlers, it's possible to create scenarios where requests endlessly circulate between handlers, leading to infinite loops and system instability.

3. _Performance Overhead_
   : Passing the request through multiple handlers in the chain incurs a performance overhead, especially if each handler needs to perform significant processing or if the chain is long. Careful consideration should be given to performance implications, especially in performance-sensitive systems.
