# Command Pattern

> Encapsulate a request as an object instead, allowing you to parameterize clients with different requests, queue, or log reuqests and support redo and undo of requests and operations.

Sometimes operations and requests cannot be fully accounted for within a design or code for an application or context due to your application scaling out and handling operations dynamically without specific direction or allocation. This can happen with toolkits which may have variety of requests that can happen on the press of a button or interaction with a menu, but will have no idea on who may receive that specific request or the operations themselves.

By making requests and operations themselves objects then you can use them without any specific requester or allow a bit more freedom in how they are used within an application because they are not constrained by a specific class themselves. As commands are created using interfaces they can in some ways solidify and hold very particular relationships between receiever-action pair. This also is useful for menu's when one command can be a sequence of numerous actions or can be a complex request which entails multiple requests. Thus using the command pattern can encapsulate this sequence of commands or complexity into the one command itself.

When we encapsulate requests, operations, and actions into their own classes we can also pass them along to other classes or clients. This is useful when you consider that other classes may use these methods as well and can call requests on other objects or classes within a program. Another useful way is to share or transfer commands between two completely different objects perhaps between a button and a menu and vice versa.

## Application

- Parameterize objects by an action to perform. Commands are an object-oriented replacement for callbacks.
- Specify, queue, and execute requests at different times.
- Support Undo since if you encapsulate an execute function within a command class. You can also encapsulate an unexecute or undo function as well within that same command class that can reverse the action, request, or command performed.
- Structure a system around high-level operations built on primitive operations. This is common in systems that support transactions. A transaction encapsulates a set of changes to data. The command pattern offers a way to model transactions. Commands have a common interface, letting you invoke all transactions teh same way.

## Definitions

**Command**
: declares an interface for executing an operation.

**ConcreteCommand**
: defines a binding between Reciever object and an action, implements execute by invoking the corresponding operation(s) on Reciever.

**Client**
: creates a ConcreteCommand object and sets its receiver.

**Invoker**
: asks the command to carry out the request.

**Reciever**
: knows how to perform the operations associated with carrying out a request. Any class may serve as a Reciever.

## Consequences
