# Memento Pattern

> Allows objects to capture their internal state without exposing their structure, facilitating later restoration of that state, commonly used for implementing undo mechanisms or checkpoints in software applications.

The Memento pattern is a behavioral design pattern that enables the capture and restoration of an object's internal state without exposing its implementation details. It consists of three main components: the Originator, the Memento, and the Caretaker.

The Originator is the object whose state needs to be saved. It provides methods to create a Memento object representing its current state and to restore its state from a Memento object. In web development, an Originator could be a component, such as a form, that needs to retain its state across interactions.

The Memento represents the snapshot of the Originator's state at a particular point in time. It typically holds the state data in a structure that allows for easy restoration. In the context of web development, a Memento object could encapsulate the data entered into a form at a specific moment.

The Caretaker is responsible for managing the Mementos. It stores and retrieves Memento objects, but it does not modify them. In web development, the Caretaker could be a controller or service that orchestrates the saving and restoring of the state, such as storing form data in local storage or managing session data.

Together, these components allow for the implementation of features like undo functionality, checkpoints, or state rollback mechanisms in web applications. For example, in a web form scenario, the Memento pattern could be used to save the state of a form when a user navigates away from the page and restore it when they return, ensuring that their entered data is retained.

Overall, the Memento pattern promotes encapsulation by keeping the internal state of objects private and accessible only through well-defined interfaces. This enhances modularity, maintainability, and flexibility in software development, especially in web applications where preserving user interactions and data is crucial for a seamless user experience.

## Application

- a snapshot of (some portion of) an object's state must be saved so that it can be restored to that state later
- a direct interface to obtaining the state would expose implementation details and break the object's encapsulation.

## Definitions

**Memento**
: stores internal state of the Originator object. The memento may store as much or as little of the originator's internal state as necessary at its originator's discretion. It protects against access by objects other than the originator. Mementos have effectively two interfaces. Caretaker sees a narrow interface to the Memento—it can only pass the memento to other objects. Originator, in contrast, sees a wide interface, one that lets it access all the data necessary to restore itself to its previous state. Ideally, only the originator that produced the memento would be permitted to access the memento's internal state.

**Originator**
: creates a memento containing a snapshot of its current internal state. It uses the memento to restore its internal state.

**Caretaker**
: It is responsible for the memento's safekeeping. It never operates on or examines the contents of a memento.

## Consequences

1. _Using mementos might be expensive_
   : Mementos might incur considerable overhead if Originator must copy large amounts of information to store in the memento or if clients create and return mementos to the originator often enough. Unless encapsulating and restoring Originator state is cheap, the pattern might not be appropriate.

2. _Defining narrow and wide interfaces_
   : It may be difficult in some languages to ensure that only the originator can access the memento's state.

3. _Hidden costs in caring for mementos._
   : A caretaker is responsible for deleting the mementos it cares for. However, the caretaker has no idea how much state is in the memento. Hence an otherwise lightweight caretaker might incur large storage costs when it stores mementos.
