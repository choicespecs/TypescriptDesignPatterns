# Abstract Factory Pattern

> Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

[Abstract Factory Video](https://youtu.be/2mEUGVrU8OA)

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
: uses only interfaces declared by **AbstractFactory** and **AbstractProduct** classes.

## Consequences

1. _Isolates concrete classes_
   : helps control the classes of objects an application creates. This refers to how a factory can encapsulate responsibilities and the process of creating objects so it can isolate their clients from implementing classes. Clients then can further manipulate instances through interfaces meaning specifically you can isolate implementation and add further abstraction in your code.

2. _Exchanging product families becomes easy._
   : Since there is only one concrete factory within your application. It becomes easier to switch out the factory within your application if necessary since they implement the same factory methods and have the same family of products through their interface.

3. _Promotes consistency among products._
   : Helps enforce a specific family of products within a factory thus creating a bit of consistency in how factories are created, implemented, and used within an application

4. _Supporting new products is difficult._
   : When you want to add a new product within an already existing abstract factory that becomes a bit difficult since when one new product is added then all concrete implementations of that abstract factory must be adjusted as well.
