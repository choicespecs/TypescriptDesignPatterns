# Bridge Pattern

> Separates abstraction from implementation, allowing them to vary independently and enabling a client to interact with different implementations through a common interface.

When there can be several different implementations of an abstraction such as with a Shape, the typical way to accomodate them is to use inheritance such as defining Squares, Rectangles, and Triangles. This approach though isn't always flexible enough. Inheritance binds an implementation to the abstraction permanently, so it is difficult to modify, extend, and reuse abstractions and implementations independently.

For example, when there are Squares, Triangles, and Rectangles being defined under Shape. Adding colors such as Red, Blue, Green would mean that there would be additional classes maybe Colors that would need to inherit Shape class and thus adding more classes such as Red Square, Red Rectangle, and Red Triangle causing an enormous amount of classes along with very tight coupled implementation to abstraction relationships.

Instead of having this direct abstraction to implementation relationship, the bridge pattern can be used to separate the abstraction and implementation relationship. For the Shape and Color example, we can modify Shapes without having to modify the Colors and vice versa. Allowing this separation means we build flexible parts that are easier to maintain. This also promotes code reusability since there is more modular code which can be extended rather than implemented. An important aspect to consider is a loosely coupled abstraction and implementation would mean better longevity of allowing both to evolve and grow independently without disrupting the system.

## Application

- You want to avoid a permanent binding between an abstraction and its implementation. This might be the case, for example, when the implementation must be selected or switched at run-time.
- When you need to support different implementations for the same abstraction: If you have different implementations that should be interchangeable for a given abstraction, such as supporting different drawing libraries or database drivers, the Bridge pattern facilitates this flexibility.
- When you're working with complex hierarchies that need to be simplified: If you have complex class hierarchies that are difficult to manage or extend, the Bridge pattern can simplify the design by splitting them into separate hierarchies for abstraction and implementation.

## Definitions

**Abstraction**
: defines the abstraction's interface, Maintains a reference to an object of type Implementor.

**RefinedAbstraction**
: Extends the interface defined by Abstraction.

**Implementor**
: defines the interface for implementation classes. This interface doesn't have to correspond exactly to Abstraction's interface; in fact the two interfaces can be quite different.Typically the Implementor interface provides only primitive operations, and Abstraction defines higher-level operations based on these primitives.

**ConcreteImplementor**
: implements the Implementor interface and defines its concrete
implementation.

## Consequences

1. _Increased Number of Classes and Interfaces_
   : Implementing the Bridge pattern typically involves creating separate abstraction and implementation hierarchies, which can result in an increased number of classes and interfaces. This proliferation of entities can make the codebase more challenging to navigate and comprehend.

2. _Difficulty in Understanding Relationships_
   : The Bridge pattern introduces a relationship between the abstraction and implementation through composition. Understanding and managing these relationships, particularly in larger systems with multiple bridges, can become challenging.

3. _Potential Over-Engineering_
   : Applying the Bridge pattern to every abstraction and implementation in a system, even when not strictly necessary, can lead to over-engineering. It's essential to evaluate whether the added flexibility and separation are genuinely beneficial for the specific context.
