# Behavioral Patterns

Behavioral design patterns focus on how objects distribute responsibilities and encapsulate behavior between them. They deal with communication patterns between objects to achieve specific functionalities. Here are some common behavioral design patterns:

- **Observer Pattern**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- **Strategy Pattern**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
- **Command Pattern**: Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
- **Chain of Responsibility Pattern**: Allows an object to send a command without knowing what object will receive and handle it. The request is passed along a chain of objects until one of them handles it.
- **Iterator Pattern**: Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- **State Pattern**: Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.
- **Visitor Pattern**: Represents an operation to be performed on elements of an object structure. It lets you define a new operation without changing the classes of the elements on which it operates.
- **Interpreter Pattern**: Defines a grammatical representation for a language and provides an interpreter to interpret sentences in the language.
- **Memento Pattern**: Captures and externalizes an object's internal state so that the object can be restored to this state later, without violating encapsulation.
- **Template Method Pattern**: Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

These patterns address various aspects of object interaction and behavior management. They promote flexibility, extensibility, and maintainability by decoupling the interacting objects, encapsulating behaviors, and providing standardized solutions to common problems in object-oriented design.

Contexts when to use the patterns could be including:

- **Observer Pattern**: Use when you have a one-to-many relationship between objects, and changes to one object require updates to multiple other objects, such as in event handling systems or MVC architectures.
- **Strategy Pattern**: Use when you need to define a family of algorithms, encapsulate each one, and make them interchangeable at runtime, allowing clients to vary behavior without altering their structure.
- **Command Pattern**: Use when you want to encapsulate a request as an object, allowing for parameterization of clients with queues, requests, and operations, and supporting undoable operations and logging.
- **Chain of Responsibility Pattern**: Use when you want to decouple senders and receivers of requests and allow multiple objects to handle the request without explicitly specifying the receiver.
- **Iterator Pattern**: Use when you want to provide a way to access elements of an aggregate object sequentially without exposing its underlying representation, enabling traversal of collections in a uniform manner.
- **State Pattern**: Use when an object's behavior changes based on its internal state, and you want to encapsulate each state in a separate class, avoiding large switch-case or if-else structures.
- **Visitor Pattern**: Use when you want to define operations on elements of an object structure without changing the classes of the elements themselves, such as when adding new operations to a class hierarchy.
- **Interpreter Pattern**: Use when you need to define a grammar for a simple language and provide an interpreter to evaluate expressions written in that language, such as in domain-specific language implementations.
- **Memento Pattern**: Use when you want to capture and externalize an object's internal state to support undo mechanisms, checkpoints, or history logging without violating encapsulation.
- **Template Method Pattern**: Use when you want to define the skeleton of an algorithm in a superclass but allow subclasses to override specific steps, enabling code reuse while still providing flexibility in algorithm implementation.
