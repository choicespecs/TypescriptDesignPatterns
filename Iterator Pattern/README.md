# Iterator Pattern

> Provides a way to access elements within an list or some collection in a sequence without having to understand or expose its underlying representation.

[Iterator Pattern Video](https://youtu.be/frI7-k8oiYc)

Lists or Collections hold items also known as objects within Applications for specific purposes and can be utilized in many different contexts and domains for different purposes. Even Databases can be converted or abstracted to these Collections or Lists. However; an important concept to consider is how can items be accessed or how can lists be traversed. Typically many of these Lists and Collections will be abstracted into their own interfaces with methods for access and traversal, but the Iterator pattern decouples these behaviors into their own interface.

The purpose of decoupling both access and traversal from the List or Collection and creating it's own abstraction is allowing different implementations and behaviors of access and traversal within a List. There can be Iterators which may access only specific elements or may only traverse the List in a very specific manner other than simply iterating sequentially. However; you may need to have multiple ways you may need to support such traversal within an application such as iterating through a database which may have a iterator as a filter while another iteration will skip specific index based on a user's own preference.

Since we are decoupling the "iteration" from a list. We can end up many multiple implementations of a List and at the same time end up with multiple implentations of iterators. This can end up with the problem of placing the appropriate iterator to the appropriate list thus the responsibility of creating the iterator should be placed within the List. We can utilize the factory method to instantiate both the iterators and lists and have a way to connect the two together.


## Application
- Access an aggregate object's contents without exposing its internal representation.
- to support multiple traversals of aggregate objects.
- to provide a uniform interface for traversing different aggregate structures (that is, to support polymorphic iteration)

## Definitions
**Iterator**
: defines an interface for accessing and traversing elements.

**Concrete Iterator**
: implements the Iterator interface and keeps track of the current position in the traversal of the aggregate.

**Aggregate**
: defines an interface for creating an Iterator object.

**Concrete Aggregate**
: implements the Iterator creation interface to return an instance of the proper Concrete Iterator.

## Consequences
1. *It supports variations in the traversal of a List or Collection*
: There can be multiple ways within an application that may require a traversal of one collection or list. This can be through a specific order of indexing or could be a specific algorithm which traverses the index which does not follow a typical sequential order. This traversal may also require the knowledge of the current position within the traversal or the prev and next. Thus the iterator pattern can allow for multiple traversals with the knowledge of the current position within each one.

2. *Multiple traversals at the same current time*
: Different iterators running either concurrently or in a specific order or time can lead to different traversals in progress which may be necessary depending on the application or domain.

3. *Simplifies the List or Collection Interface*
: If you abstract the traversal from the List or Collection you are able to simplify the interface of the List or Collection as well.



