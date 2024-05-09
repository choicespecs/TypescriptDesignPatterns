# State Pattern

> Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

State design pattern allows a context (an object that may have a certain state) to behave differently at runtime allowing different behavior as needed. Utilizing states or shifting complex, multipart conditionals into their own classes separates different behaviors by an object's internal state. This can help design complex relationships and applications with parts that can transition or change dynamically. This could be used for example in a TCP connection which may change it's state from listening to closed or could be the use of a UI front-end which may change it's state depending on the events or actions that may occur within an application.

All behaviors that are associated with a particular state will be localized into one object. Therefore, adding new states or new transitions will only mean adding new objects into an application. This decreases coupling meaning that there are less dependencies between behaviors, functions, and objects since both behaviors and state are localized together. An important distinction however is understanding that the differences between states may be the implementation of a particular action, but all states must have the same internal function or behavior that must be implemented. This is what makes this pattern slightly different than State machines.

## Application

- localizes state-specific behavior and partition behavior for different states
- new states and partitions can be easily added by defining new subclasses.
- eliminates the need for "if" and "switch" statements and can keep complex behaviors within their own conditional states.
- State transitions are atomic from the context's perspective since they happen by rebinding just the Context itself, so can make transitions more explicit for an application.


## Definitions

**Context**
: defines the interface of interest to clients.

**State**
: defines an interface for encapsulating the behavior associated with a particular state of the Context.

**ConcreteState subclasses**
: each subclass implements a behavior associated with a state of the context.

## Consequences

1. _Defining State Transitions_
    : Determining how states transition from one State to another can lead to unintentional dependencies between certain states which can lead to an entire application or system not being as open to extension in the future. Determining where state transitions must be defined either within the Context or the State themselves can also lead to unintentional consequences when designing a system.

2. _Memory and Complexity_
    : Every state needs to be defined. There could potentially be many classes or states with little to no functionality. There could be added complexity within a program due to the addition of all the states and their transitions. Memory use can also be a factor ending up with multiple classes being instantiated to represent states for multiple different objects.

