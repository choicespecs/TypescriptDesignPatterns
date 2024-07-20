# Observer Pattern

> One-to-many dependency so when one object changes state all dependents are notified.

[Observer Pattern Video](https://youtu.be/L7Z0OSQAUZc)

This pattern focuses on two objects. One object may change it's _state_ while another object may want to know the state of the first object or want to know whenever the first object changes state.

Moves from a **poll** to a **push** design. A poll design is focused on having objects constantly checking whether or not an object has changed it's state. However; a poll design will focus on notifying all objects whenever a change has occurred, but the object must know ALL of their potential observers.

There is also an interaction known as **publish-subscribe**. The subject is the publisher of notifications and can send notifications without having to know who its observers are. Any number of observers can subscribe to receive notifications.

## Application

- Abstraction has two aspects, one dependent on the other, Encapsulating these aspects in separate objects let you vary and reuse them independently.
- When change to one object requires changing others, and you don't know how many objects may potentially need to be changed.
- When an object should be notify other objects without making assumptions about who these objects are. In other words, you don't want these objects tightly coupled.

## Definitions

**Subject**
: knows it's observers, any number of observer objects may observe a subject, Provides an interface for attaching and detaching Observer objects

**Observer**
: defines an updating interface for objects that should be notified of changes in a subject.

**ConcreteSubject**
: stores state of interest to ConcreteObserver objects, sends an notification to its observers when its state changes.

**ConcreteObservers**
: maintains a reference to a ConcreteSubject object, stores state that should stay consistent with the subjects, implements the Observer updating interface to keep its state consistent with the subject's.

## Consequences

1. _Abstract coupling between Subject and Observer_
   : The subject doesnt know the concrete class of any observer so the coupling between subjects and observers are abstract and minimal. Since there is a bit of abstraction and not as tightly coupled between one another they can exist at different layers within a system.
2. _Support for broadcast communication_
   : Nofications do not need to specify their recipients so you can broadcast to all interested objects. So you do not need to be preoccupied with the number of participants or how to manage the messages between observers.
3. _Unexpected Updates_
   : Since there is abstraction between observers and their subjects it could be potential updates that may occur unexpectedly. Once this occurs it may become difficult to track and figure out where the changes, updates, or notifications originally have come from.
