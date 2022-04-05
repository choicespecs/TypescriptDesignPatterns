# Strategy Pattern

> Defines a family of algorithms, encapsulate each one, and make them interchangable.

[Strategy Pattern Video](https://youtu.be/KGcw4Lq_p5k)

Defines a "family of algorithms". It encapsulates each one so they can be used interchangably. For example, if you had three algorithms A, B, C the _Strategy_ pattern allows you to interchange between the three algorithms without any issues.

The _Strategy_ pattern allows the algorithm to vary independent frmo the client that uses it. So, Algorithms and clients are independent from one another and do not depend on one another Therefore, You can change the algorithm without affecting the client.

_Strategy_ Pattern is used for more methods, behaviors, and algorithms that are meant to be reused

## Application

- Many related classes differ only in their behaviors. This pattern allows you to configure a class with one of many behaviors
- You need different variants of a particular algorithm. You create a class hierarchy of algorithms
- An algorithm uses data that clients should NOT know about.
- class defines many behaviors and these appear as conditions in their operations. You can instead of using conditionals you can implement their behaviors and algorithms as their own strategy.

## Definitions

**Strategy**
: declares an interface common to ALL supposed algorithms. Context uses this interface to call the alogirthm defined by a ConcreteStrategy

**ConcreteStrategy**
: implements the algorithm using the Strategy interface

**Context**
: is configued with a ConcreteStrategy object, maintains a reference to a Strategy object, and may define an interface that lets strategy access its data

## Consequences

1. _Family of related algorithms_
   : help define family of algorithms or behaviors for context to reuse.
2. _An alternative to subclassing_
   : separation between the context and strategy allows for you to manipulate either one without affect one another.
3. _Strategies eliminate conditional statements_
   : helps alleviate switch statements or large conditionals which instead switches to use multiple behaviors or algorithms instead.
4. _A choice of implementations_
   : Can perform DIFFERENT implementation of the same behavior
5. _Clients must be aware of different strategies_
   : Client must have some understanding of the behaviors or strategies
6. _Communication overhead between Strategy and Context_
   : Since the strategy interface is shared between ALL concrete implementations. There can be scenarios or situations where you may not utilize or implement parameter, methods, or variables within the interface itself. THus this may require tighter coupling between Strategy and Context
7. _Increased number of objects_
