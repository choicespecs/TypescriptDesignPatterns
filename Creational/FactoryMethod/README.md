# Factory Method Pattern

> Focuses on object creation, but lets subclasses decide which class to instantiate.

[Factory Method Pattern Video](https://youtu.be/MR2javczhZs)

At times in some application, software, or in some purpose you may need to create classes, but you won't be able to know _what_ specific class is needed to be created nor will you be able to predict _when_ you may need to create this class. This can be more complicated when you consider that you may need to create a specific collection of classes for a specific subsection of an application or software.

The _Factory Method_ allows for the creation and instantiation of a class or subclass depending on the specific application or situation. This allows for further abstraction for later expansion or even further scaling without having to work towards concrete implementations of classes.

## Application

- A class can't anticipate the class of objects it must create.
- A class wants its subclasses to specify the objects it creates.
- Classes delegate responsibilities to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.

## Definitions

**Product**
: defines the interface of objects the factory method creates.

**ConcreteProduct**
: implements the Product interface

**Creator**
: declares the facotry method, which returns an object of type Product. Creators may also define a default implementation of the facotry method that returns a default ConcreteProduct object. The Creator may also call the facotry method to create a Product object.

**ConcreteCreator**
: overrides the factory method to return an instance of a ConcreteProduct

## Consequences

1. _Eliminates need to bind application specific classes_
   : code will only deal with the Product interface thus it can work with any defined ConcreteProduct
2. _You may need to subclass Creator to create a specific ConcreteProduct_
   : This can add another layer onto your code only to add one object or class to your code.
3. _Provides hooks for subclasses_
   : creating objects inside a class with a Factory Method is more flexible than creating the object directly
4. _Connects parallel class hierarchies_
   : when a class delegates some of its responsibilities to a separate class. You can use the Factory Method to create something like a Manipulator subclass which can assist a class with these additional responsibiltiies provided the appropriate constraints or variables on the class itself.
