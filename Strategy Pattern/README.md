# Strategy Pattern

Defines a "family of algorithms". It encapsulates each one so they can be used interchangably. For example, if you had three algorithms A, B, C the _Strategy_ pattern allows you to interchange between the three algorithms without any issues.

The _Strategy_ pattern allows the algorithm to vary independent frmo the client that uses it. So, Algorithms and clients are independent from one another and do not depend on one another Therefore, You can change the algorithm without affecting the client.

_Strategy_ Pattern is used for more methods, behaviors, and algorithms that are meant to be reused

## Application

- Many related classes differ only in their behaviors. This pattern allows you to configure a class with one of many behaviors
- You need different variants of a particular algorithm. You create a class hierarchy of algorithms
- An algorithm uses data that clients should NOT know about.
- class defines many behaviors and these appear as conditions in their operations. You can instead of using conditionals you can implement their behaviors and algorithms as their own strategy.
