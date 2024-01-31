# Prototype Pattern

> Provides a blueprint to create new similar objects.

## Application

he prototype design pattern is a creational design pattern that aims to create new objects by copying or cloning existing objects, known as prototypes, rather than instantiating new objects from scratch. By using the prototype pattern, you can promote flexibility and efficiency in object creation, as new objects can be created dynamically by cloning existing prototypes, reducing the need for subclassing and instantiation logic in client code.

Subclassing is a concept in object-oriented programming where a new class (subclass) is derived from an existing class (superclass), inheriting its attributes and behaviors, and potentially adding new ones or modifying existing ones. The prototype design pattern helps address issues related to subclassing by providing an alternative mechanism for object creation. Instead of creating new objects through subclassing, the prototype pattern allows objects to be cloned from existing prototypes. This approach promotes flexibility and reduces the need for creating subclasses to customize object creation logic.

The cloning prototype classes provide the actual implementation for cloning themselves. Objects are cloned either through shallow copying (copying only the immediate properties of the object) or deep copying (copying the object and all its nested properties recursively), depending on the requirements of the application.

## Definitions

**Prototype**
: declares an interface for cloning itself.

**ConcretePrototype**
: implements an operation for closing itself.

**Client**
: creates a new object by asking a prototype to clone itself.

**Shallow Copy**
: a copy of an object that duplicates only the references of its members, not the actual objects themselves. Useful when object state does not change dynamically or when members are immutable.

**Deep Copy**
: a copy of an object that duplicates both the object and its members, creating new instances. This approach ensures complete duplication of the object including nested objects and states. Necessary when the objects being cloned have complex structures with nested objects, and you need to ensure that changes to the original object's state do not affect the cloned object and vice versa.

## Consequences

1. _Customize Prototypes not objects_
   : Clients can easily customize and configure new objects by modifying the state of existing prototypes before cloning them, providing a convenient way to create variations of objects

2. _Reduce Subclass Proliferation_
   : Unlike subclassing, which can lead to a large number of subclasses for every variation of an object, the prototype pattern reduces subclass proliferation by allowing objects to be dynamically configured and cloned as needed.

3. _Identity vs Equality_
   : Cloning objects using the prototype pattern may raise questions about object identity versus object equality, especially when comparing cloned objects or managing object references.
