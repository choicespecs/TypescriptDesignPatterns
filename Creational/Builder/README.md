# Builder Pattern

> Separate the construction of a complex object from its representation so that the same construction process can create different representations.

When an object has many attributes that may need to be set before it is usable, using a constructor with a large amount of arguments can become confusing and error-prone. The Builder Pattern separates the construction of the object from its representation making the code cleaner. The Builder Pattern allows you to create an object step by step, clearly indicating the configuration options being set. This can lead to clearer object creation.

The Builder pattern can also be used when you want to expand an objects attributes and configurations. This can lead to more constructor overloading in object creation which can lead to complexity in object creation. The Builder Pattern creates a separate builder class which can be used for setting attributes instead. Other benefits to this also means we encapsulate object creation within the builder class, we are able to make sure objects are fully initialized before use, can enforce immutability ensuring integrity of the object state.

## Application

- Creates object creation as independent of the parts that make up the object and how they're assembled.
- Allows a construction process that can produce different representation of the object that is constructed.
- Allows varied product internal representation
- Gives finer control over the construction process.

## Definition

**Builder**
: specifies an abstract interface for creating parts of a Product object.

**ConcreteBuilder**
: constructs and assembles part of the product by implementing the builder interface, defines the keeps track of the representation it creates, and provides an interface for retrieving the product.

**Director**
: constructs an object using the Builder interface.

**Product**
: represents the complex object under construction. ConcreteBuilder builds the product's internal representation and defines the process by which it's assembled, includes classes that define the constituent parts, including interfaces for assembling the parts into the final result.

## Consequences

1. _Assembly / Construction Interface_
    : Builders need to be general enough to allow the construction fo all kinds of concrete builders. This can be simple enough with objects that may only append new attributes, but can end up becoming more complex if you end up adding tree-like structures to objects that may need to pass objects to build from parent nodes or child nodes.

2. _Different abstract classes & builders_
    : Products produced by concrete builders differ so greatly that in their representation there is little to gain from giving different products a common parent class. Thus the director can specify which concrete builder to call and can handle its products accordingly

