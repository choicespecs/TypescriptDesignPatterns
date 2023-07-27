# Facade Pattern

[Facade Pattern Video](https://youtu.be/53Q8hutwuwI)

> Provides a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

An application can have multiple components, parts, interfaces, or sections that separately have their own unique designs and patterns themselves. As these sections interact with one another, they can create their own subsystems within an application. However; this can create more complexity as further design choices in the future must be made for preexisting "subsystems" within an application.

The *Facade Pattern* decouples the complexity from seemingly independent parts of an application and creates a unified subsystem which allows clients and applications to make decisions, interact with the subsystem, and help future decisions without needing to understand or know the individual parts themselves.

Adding an entire subsystem to your application or purpose using the *Facade Pattern* can help simplify complexity by removing details that may not be needed for clients or future developers UNLESS necessary or needed.

## Application
- Clients communicate with the subsystem by sending requests to Facade, which forwards them to the appropriate subsystem object. Although the subsystem objects perofrm the actual work, the facade may have to do work of its own to translate its interface to subsystem interfaces.
- Clients that use the facade don't have to access its subsystem objects directly.
- The implementation a facade and a subsystem allows you to add another layer of abstraction which can alleviate both complexity and dependencies between clients and objects themselves.
- Subsystems allow an implementation of layers which allow an entry point between potential layers within an application. Each layer can therefore communicate with other Facade's as entry points.

## Definitions

**Facade**
: knows which subsystem classes are responsible for a request, and delegates client requests to appropriate subsystem objects.

**subsystem classes**
: implement subsystem functionality handle work assigned by the Facade object. have no knowledge of the facade; that is, they keep no references to it.


## Consequences

1. *Shields clients from subsystem components*
    : Clients don't need to be involved with the subsystems individual components and can interact at a higher level thus reducing complexity by reducing the interactions a client may make between clients by having the client interact with the facade instead.
2. *Promotes weak coupling between the subsystem and its clients*
    : When the components within an application are strongly coupled it becomes quite difficult for future modification or adjustments without affecting parts or components that may share relationships or dependencies. As applications grow and scale, modifying individual parts becomes harder when there becomes complex underlying dependencies shared. The Facade allows separating into subsystems that can be handled instead of objects themselves.
3. *It doesn't prevent applications form using subsystem classes if they need to*
    :You can choose between ease of use and generality
