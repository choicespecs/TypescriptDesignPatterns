# Abstract Factory Pattern

> Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

A good example of utilizing this pattern can be understood by analyzing _toolkits_ or _themes_ which encompass several different "widgets" or parts which may include UI elements like scroll bars, windows, buttons or many other different elements. These toolkits or themes may not even have any specific understood hardcoded objects or classes. However; it is apparent that these objects and UI elements which exist within these _toolkits_ and _themes_ must be related and utilized together in a single family of objects. This _Abstract Factory_ pattern can force these objects to remain in these families through the use of an interface which will have their own methods on object creation which can present these families of objects together within an application.

Using the _Abstract Factory_ pattern can also help establish relationships and dependencies between these objects within these families which may be useful for specific applications or programs as needed. Normally a single instance of a Concrete implementation of the Abstract Factory is created at run-time. This facotry can create product objects with a specific implementation. To create completely different product objects then an entirely different concrete implementation must be instantiated.

## Application

- A system should be independent on how its products are created, composed, and represented.
- A system should be configured with one of multiple families of products.
- A family of related product objects is designed to be used together, and you need to enforce this constraint.
- You want to provide a class library of products, and you want to reveal just their interfacts, not their implementations.

## Definitions

**Abstract Factory**
: declares an interface for operations that create abstract product objects.

**ConcreteFactory**
: implements the operations to create concrete product objects.

**AbstractProduct**
: declares an interface for a type of product object.

**ConcreteProduct**
: defines a product object to be created by the corresponding concrete factory, implements the **AbstractProduct** interface

**Client**
: uses only interfaces decalred by **AbstractFactory** and **AbstractProduct** classes.

## Consequences

1. _Isolates concrete classes_
   :

2. _Exchanging product families becomes easy._
   :

3. _Promotes consistency among products._
   :

4. _Supporting new products is difficult._
   :
