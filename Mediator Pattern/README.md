# Mediator Pattern

> Centralizes communication logic, facilitating complex interactions without direct connections between components.

Imagine you have a complex system where multiple objects need to communicate with each other. Directly connecting every object to each other can lead to a tangled mess of dependencies, making the system hard to understand and maintain. The Mediator design pattern steps in to untangle this web.

At its core, the Mediator pattern introduces a mediator object that acts as a centralized hub for communication between different components. Instead of objects directly talking to each other, they communicate through the mediator. This centralization of communication logic simplifies the connections between components, promoting a more modular and loosely coupled design.

By using the Mediator pattern, each component only needs to know about the mediator, reducing dependencies and making it easier to change or extend the system without affecting other parts. It also enhances the reusability of components since they are not tightly bound to specific interactions. Overall, the Mediator pattern improves the maintainability, extensibility, and readability of complex systems by providing a clear and organized way for objects to communicate without directly depending on each other.

## Application

- a set of objects communicate in well-defined but complex ways. The resulting interdependencies are unstructured and difficult to understand.
- reusing an object is difficult because it refers to and communicates with many other objects.
- a behavior that’s distributed between several classes should be customizable without a lot of subclassing.

## Definitions

**Mediator**
: defines an interface for communicating with Colleague objects.

**Concrete Mediator**
: implements cooperative behavior by coordinating Colleague objects. Concrete Mediator knows and maintains its colleagues.

**Colleague Classes**
: each Colleague class knows its Mediator object. each colleague communicates with its mediator whenever it would have otherwise communicated with another colleague.

**Collaborations**
: Colleagues send and receive requests from a Mediator object. The mediator implements the cooperative behavior by routing requests between the appropriate colleague(s).

## Consequences

1. _It centralizes control_
   : The Mediator pattern trades complexity of interaction for complexity in the mediator. Because a mediator encapsulates protocols, it can become more complex than any individual colleague. This can make the mediator itself a monolith that’s hard to maintain.

2. _Increased Coupling with the Mediator_
   : While the pattern aims to reduce coupling between individual components, there's a risk of increasing coupling with the mediator itself. Components may become tightly coupled to the mediator's interface or implementation, making it harder to change or replace the mediator later.

3. _Potential for God Object Antipattern_
   : If not implemented carefully, the mediator can evolve into a "God object" that knows too much about the system and handles too many responsibilities. This can lead to maintenance challenges and hinder scalability and modifiability.
