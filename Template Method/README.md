# Template Method Pattern

[Template Pattern Video](https://youtu.be/3b0uOjYbMOw)

> Uses a "skeleton" of an algorithm in an operation, allow subclasses to redefine certain steps of an algorithm without changing the algorithm's structure.

At a higher level view of an application, there may be many classes or structures which share some similar or slightly related behaviors / methods. These structures may be affected in somewhat similar manners or ways as well. If we approach these similarities through the lens of an algorithm, we may notice that we can abstract perhaps a common order or common behaviors, but cannot quite exactly instantiate these patterns to apply to all these classes.

The _Template Method_ pattern allows to have some structure to some pattern of behavior through an algorithm. This pattern allows subclasses, classes, or parts of an application the freedom to instantiate or concretely define those parts of the algorithm to how they may relate to their own situation or circumstance. This can be used to establish a skeleton for implementing a framework within an application and at the same time allowing freedom to interchange different behaviors or methods to perform actions within this framework.

## Application
- implement the invariant parts of an algorithm once and leave it up to the subclasses to implement the behavior that can vary.
- When common behavior among subclasses should be factored and localized in a common class to avoid code duplication. Identifying the differences in an existing codebase and then separating those differences into new operations. You can utilize the Template Method to replace differing code that calls one of these new operations.
- control subclass extensions. You can define a template method that calls "hook" operations at specific points, therby permitting extensions only at those points.

## Definitions

**AbstractClass**
- defines abstract primitive operations that concrete subclasses define to implement steps of an algorithm.
- implements a template method defining the skeleton of an algorithm. The template method calls primitive operations as well as operations defined in AbstractClass or those of other objects.

**ConcreteClass**
- implements the primitive operations to carry out subclass-specific steps of the algorithm.

## Consequences
1. *Code Reuse*
: can be used within code libraries to factor out common behavior in library classes.

2. *Inversion of Control*
: The "Hollywood principle" meaning "Don't call us, we'll call you". Parent class can call the operations of a subclass, but not the other way around. This will prevent potential dependency rot which can occur when higher level component may depend on lower level ones leading to a misunderstanding of how a system is designed. The higher level template will control the order or even the dependency of the concrete subclasses which may have different implementations of the algorithm structure. Thus we can invert the control and not have to depend on the subclasses with the set "skeleton" determined by the template itself.

3. *Hooks / Primitive Operations*
: Template pattern has both primitive operations and hook operations. Hook operations are those that provide default behavior that subclasses can extend if necessary, so in a sense the hook operation does nothing by default. However, the primitive operations will be the abstract operations that must be overridden and created within the template. Thus using a hook such as a boolean can implement a section of a template if it chooses to do so or not depending on the function of the template itself.


