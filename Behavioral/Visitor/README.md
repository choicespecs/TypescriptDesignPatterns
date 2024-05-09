# Visitor Pattern

> Allows you to define new operations without changing the classes of the elements on which they operate by separating the algorithm from the object structure.

The Visitor design pattern is a behavioral pattern that enables you to add new operations to a set of related classes without altering their structure. It achieves this by separating the algorithm from the object structure. This is particularly useful when you have a complex object structure with different types of objects and you want to perform various operations on them without modifying their individual classes.

Imagine you have a program that models a zoo with different types of animals: lions, monkeys, and giraffes. Each animal class has its own set of methods and properties. Now, let's say you want to perform various tasks on these animals, such as feeding, cleaning, and observing, without modifying the animal classes themselves.

Here's where the Visitor pattern comes in handy. You can define a visitor interface with visit methods for each type of animal. Each animal class then implements an accept method that allows a visitor object to visit it. When you want to perform an operation on the animals, you create a concrete visitor class that implements the visitor interface and defines the behavior for each visit method.

For example, you might have a FeedVisitor that implements visit methods for feeding each type of animal. When you want to feed all the animals in the zoo, you create an instance of the FeedVisitor and iterate over the list of animals, calling the accept method on each animal and passing the visitor object. Each animal then accepts the visitor, which in turn calls the appropriate visit method for that animal type, performing the feeding operation.

This approach keeps the logic for each operation separate from the animal classes, making it easy to add new operations without modifying existing code. It also follows the open/closed principle, allowing you to extend the behavior of the program without altering its source code.

## Application

- an object structure contains many classes of objects with differing interfaces, and you want to perform operations on these objects that depend on their concrete classes.
- many distinct and unrelated operations need to be performed on objects in an object structure, and you want to avoid "polluting" their classes with these operations. Visitor lets you keep related operations together by defining them in one class. When the object structure is shared by many applications, use Visitor to put operations in just those applications that need them.
- the classes defining the object structure rarely change, but you often want to define new operations over the structure. Changing the object structure classes requires redefining the interface to all visitors, which is potentially costly. If the object structure classes change often, then it's probably better to define the operations in those classes.

## Definitions

**Visitor**
: declares a Visit operation for each class of ConcreteElement in the object structure. The operation's name and signature identifies the class that sends the Visit request to the visitor. That lets the visitor determine the concrete class of the element being visited. Then the visitor can access the element directly through its particular interface.

**Concrete Visitor**
: implements each operation declared by Visitor. Each operation implements a fragment of the algorithm defined for the corresponding
class of object in the structure. ConcreteVisitor provides the context for the algorithm and stores its local state. This state often accumulates results during the traversal of the structure.

**Element**
: defines an Accept operation that takes a visitor as an argument.

**Concrete Element**
: implements an Accept operation that takes a visitor as an argument.

**Object Structure**
: can enumerate its elements. It may provide a high-level interface to allow the visitor to visit its elements. It may either be a composite or a collection such as a list or a set.

## Consequences

1. _Adding new ConcreteElement classes is hard_
   : The Visitor pattern makes it hard to add new subclasses of Element. Each new ConcreteElement gives rise to a new abstract operation on Visitor and a corresponding implementation in every ConcreteVisitor class. Sometimes a default implementation can be provided in
   Visitor that can be inherited by most of the ConcreteVisitors, but this is the exception rather than the rule. So the key consideration in applying the Visitor pattern is whether you are mostly likely to change the algorithm applied over an object structure or the classes of objects that make up the structure. The Visitor class hierarchy can be difficult to maintain when new ConcreteElement classes are added frequently. In such cases, it's probably easier just to define operations on the classes that make up the structure. If the Element class hierarchy is stable, but you are continually adding operations or changing algorithms, then the Visitor pattern will help you
   manage the changes.

2. _Breaking Encapsulation_
   : Visitor's approach assumes that the ConcreteElement interface is powerful enough to let visitors do their job. As a result, the pattern
   often forces you to provide public operations that access an element's internal state, which may compromise its encapsulation.
