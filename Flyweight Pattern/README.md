# Flyweight Pattern

> Optimizes memory usage by sharing common state among multiple objects, reducing the need for redundant storage.

Imagine you're managing a large event where many attendees have similar preferences for clothing. Instead of custom-tailoring outfits for each individual, you provide a set of pre-made outfits that can be shared among attendees who have similar sizes and styles. This way, you only need to create a few variations of each outfit, known as "_flyweights_", and multiple attendees can wear the same outfit simultaneously.

In software development, this idea translates into the _Flyweight_ pattern. It's a design pattern used to optimize memory usage by sharing common state or data among multiple objects. Rather than each object storing its own copy of shared data, the Flyweight pattern centralizes this data and allows multiple objects to reference it. This approach minimizes the memory footprint of the application, especially when dealing with a large number of objects that share similar characteristics. Just like the pre-made outfits, the Flyweight pattern helps conserve resources by reusing shared data instead of duplicating it for each object.

_Flyweights_ however cannot make assumptions about the context which they operate. The key concept is the distinction between _intrinsic_ and _extrinsic_ state. Intrinsic state is stored in the flyweight; it consists of information that is independent of the flyweight's context, thereby making it sharable. Extrinsic state depends on and varies with the flyweight's context and therefore can't be shared. Client
objects are responsible for passing extrinsic state to the flyweight when it needs it.

## Application

- An application uses a large number of objects.
- Storage costs are high because of the sheer quantity of objects.
- Most object state can be made extrinsic.
- Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed.
- The application doesn't depend on object identity. Since flyweight objects may be shared, identity tests will return true for conceptually distinct objects.

## Definitions

**Flyweight**
: declares an interface through which flyweights can receive and act on extrinsic state.

**ConcreteFlyweight**
: implements the Flyweight interface and adds storage for intrinsic state, if any. A ConcreteFlyweight object must be sharable. Any state it stores must be intrinsic; that is, it must be independent of the ConcreteFlyweight object's context.

**UnsharedConcreteFlyweight**
: not all Flyweight subclasses need to be shared. The Flyweight interface _enables_ sharing; it doesn't enforce it. It's common for UnsharedConcreteFlyweight objects to have ConcreteFlyweight objects as children at some level in the flyweight object structure.

**FlyweightFactory**
: creates and manages flyweight objects. The flyweight factory ensures that flyweights are shared properly. When a client requests a flyweight, the FlyweightFactory object supplies an existing instance or creates one, if none exists.

**Client**
: maintains a reference to the flyweight. It also computes or stores the extrinsic state of flyweight.

## Consequences

1. _Introduces additional run time costs_
   : By transferring, finding, and computing extrinsic state can add additional run-time to an application using the flyweight pattern. The additional runtime costs can be offset by space savings.
2. _State sharing limitations_
   : The Flyweight pattern is most effective when there is a significant amount of shared state among objects. However, if the objects have little or no shared state, or if the shared state changes frequently, the benefits of using the Flyweight pattern may be diminished. In such cases, the overhead of managing flyweight objects may outweigh the potential memory savings.
3. _Increased Coupling_
   : The Flyweight pattern may increase the coupling between flyweight objects and client objects, as client objects need to be aware of the flyweight factory and the protocol for accessing shared flyweight objects. This increased coupling can reduce the flexibility and maintainability of the codebase, making it more difficult to modify or extend in the future.
