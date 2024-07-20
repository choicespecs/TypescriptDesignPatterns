# Proxy Pattern

> Provides a surrogate or placeholder for another object to control access to it.

The Proxy Pattern acts like an intermediary or a wrapper, controlling access to the underlying real object. The primary purpose of the Proxy Pattern is to add an extra layer of control or functionality to the original object without changing its core implementation. This can include implementing controlled access, lazy initialization by delaying creation until demand, caching, or even for other purposes like logging, remote access, and virtualization.

## Application

- Can be used to implement copy-on-write for large and complicated objects which are expensive to create. We can make sure with the proxy that if a copy is never modified we can simply return the object, once we modify the object then we can perform the copy
- Proxy does not need to know the type of real object so can deal with all subject classes uniformly.

## Definitions
**Proxy**
: maintains a reference that lets the proxy access the RealSubject. Provides an interface identical to the Subject's so that a proxy can be substituted for the real subject.

**Subject**
: defines the common interface for the real subject and Proxy so that a Proxy can be used anywhere a RealSubject is expected.

**RealSubject**
: defines the real object that the proxy represents.

**Virtual Proxy**
: create a placeholder for an expensive-to-instantiate object and initializes it only when it is actually needed.

**Remote Proxy**
: Acts as a local representation of an object located in a different address space, such as a remote server.

**Protection Proxy**
: Controls access to the real object by adding authentication or authorization checks.

**Cache Proxy**
: Stores results of expensive operations and returns cached data for identical requestsd, reducing redundant computations.


## Consequences
1. *Can hide the fact that an object resides in a different address space*
: Accessing objects remotely can add an incredible amount of complexity such as creating and closing connections. Utilizing a proxy can hide this underlying implementation and simply return the object to the client on request.

2. *Perform optimizations such as creating objects on demand*
: Without needing to continuously creating objects that may end up being memory intensive or compute intensive. Proxies can simply instantiate objects solely on request and can keep them in memory or within cache without needed to implement.

3. *Proxies can allow additional housekeeping tasks when objects are accessed*
: Can add a variety of functions, tasks on top of object creation if needed within a proxy itself to hide their implementation instead of explicitly adding these functions or tasks.
