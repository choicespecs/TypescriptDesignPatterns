# Composite Pattern

> Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

[Composite Pattern Video](https://youtu.be/O03_XasKV6I)

The Composite Pattern works by composing objects into part-whole hierarchies which mimic tree structures allowing clients, applications, or other domains to treat both individual objects and compositions of objects uniformly. This becomes more clear when you refer to Collections, Lists, or Data Structures themselves. Composite pattern allows removing some complexity within such a Collection and allowing some manipulation on the entire Collection as if it was an individual item within that Collection.

There can be several examples considering Dogs with Kennels or a Doctor who has several different individual treatments and a overall visit with similar grouping of individual items and collections of items. In both examples, what is more crucial and important is that it is unnecessary to differentiate between the individual and the group it represents. It is more important to apply some behavior whether it is sorting or getting values from either the individual or group and returning them. If it is the group you will assume that applying any behavior to that group itself will be the same as applying it to the individual such as applying Dog.feed() would be the same as Kennel.feed(). Kennel.food() would simply need to perform further manipulation to feed all dogs within the Kennel.

## Application
- Allows use of recursion to apply some behavior unto either individual elements or entire groups of objects 
- Adds simplicity to client code and can allow clients not to have to account for the composition themselves as they use application to apply behaviors to either individual items or composite structures.
- Easy to expand and add new components to part-whole hierarchies since the design is quite general.

## Definitions
**Component**
: declares the interface for objects in the composition, implements default behavior common to all classes, declares an interface for accessing and managing its child components

**Leaf**
: represents leaf objects in the composition, a leaf has no children. Defines behavior for primitive objects in the composition.

**Composite**
: defines behavior for components having children, stores child components, and implements child-related operations in the Component interface.

**Client**
: manipulates objects in the composition through the Component interface.

## Consequences

1. *Simpler interactions with Client*
: If clients can interact with composite structures and individual objects in the same manner, then there should not be any difference in how they are being interacted with thus removing specific case statements or condition statements for functions over the classes that define the composition.
2. *Overgeneralize components*
: It might be difficult to provide a common interface for classes whose functionality differs too much. You'd need to overgeneralizse the component interface, making it harder to comprehend. This becomes even more confusing if you consider that functions must be applied to both components and their leafs meaning you must make sure their results can be understood to the application or client.
3. *Ordering, Caching, and other Benefits*
: Traversing components often or frequently can use caching to quickly find information about children. You can also implement a specific ordering if necessary or needed on components as well for a particular domain or use. There is also the use of implementing Composites in a particular data strcuture such as linked lists, trees, arrays, or hash maps which can also help improve performance thus there can be much freedom in improving the traversal and use of composites in an application.

