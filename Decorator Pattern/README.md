# Decorator Pattern

> Attach additional reponsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

[Decorator Pattern Video](https://youtu.be/nS3ZrDqcoPU)

This pattern allows you to add responsibilities to individual objects without adding to an entire class. This allows you to add behaviors dynamically especially during runtime without having to use an alternative method such as inheritance to pass down responsibilities or behaviors to classes or objects. We can use _Decorators_ to wrap around objects to add these behaviors and responsibilities and forgo an traditional inheritance model.

Another key component of these _Decorators_ is that they are free to add operations for specific functionality and they do not depend on the objects they are decorating. This is important since you can expand either the decorators behaviors or you can expand the objects they are decorating without affecting one or another.

## Application

- add responsibilities to individual objects dynamically and transparently, that is, without affecting other objects
- for responsibilities that can be withdrawn
- when extension by subclassing is impractical. Sometimes a large number of independent extensions are possible and would produce an explosion of subclasses to support every combination. Or a class definition may be hidden or otherwise unavailable for subclassing.

## Definitions

**Component**
: defines the interface for objects that can have responsibilities added to them dynamically

**ConcreteComponent**
: defines an object to which additional responsibilities can be attached.

**Decorator**
: maintains a reference to a Component object and defines an interface that conforms to Component's interface.

**ConcreteDecorator**
: adds responsibilities to the component.

## Consequences

1. _More flexibility than static inheritance_
   : Allows runtime ability to add or remove responsibilities by simply adding or removing them. It also allows a lot of mix and matching between Decorators and Components.
2. _Avoids feature-laden classes high up in the hierarchy_
   : Behaviors and Responsibilities are simplified using decorators. So you only add behaviors or decorators only when Components need them and thus you can add new Decorators or have specific Decorators for Components without having components or an application potentially pay for some features they are not using.
3. _A decorator and its component aren't identical_
   : Since the decorator wraps around a component it's also important to consider that the decorator is not it's component so it may complicate the structure or application.
4. _Lots of little objects_
   : Each decorator adds some specific behavior or responsibility, but thus can add many "smaller" objects within a system. Thus this can be problematic for those that may need to learn or debug such a system.
