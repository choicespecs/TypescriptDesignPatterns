# Adapter Pattern

> Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatable interfaces.

Programs and Applications may perhaps adopt outside libraries or toolkits. However; this can complicate their use specifically if you consider that sometimes libraries and modules do not exactly fit into an entire domain when implemented. For xample, a toolkit that illustrates a window or users uses shapes, images, and visuals to display content to the user. However; a newspaper or blog company is trying to connect lengthy articles as well in conjunction with this specific toolkit instead of implementing a completely separate prograem or library.

The solution may be adapting an interface or even a class to be used in conjunction with this library. Creating an interface that can mimic something of a *TextShape* or *TextVisual* or *TextImage* that can be used with the library. This is useful because it does not require any modification to the original code of the library, nor will it require heavy knowledge of use of the source code as well since you can use an adapter interface or class to only fit for a specific purpose within another library.

The adapter is mainly meant to add on functionality to an adapted class using either a class pattern (through multiple inheritance) or through an object pattern (through an interface which will be concretely implemented). If there are multiple adaptees then it is heavily suggested to use the adapter object pattern

## Application

- You want to use an existing class, library, or module but the specific library, class, or interface does not match into the one you needed
- Can utilize an object or class to *adapt* for functionality.
- Adapters allow functionality even with completely unrelated or unforseen classes since it eliminates the need for direct compatibility. 

## Definitions

**Target**
: defines the domain specific interface that Client uses

**Client**
: collaborates with objects conforming to the Target interface

**Adaptee**
: defines an existing interface that needs adapting.

**Adapter**
: adapts the interface of Adaptee to the Target interface.

## Consequences
1. *Complexity of Adapter itself*
: Adapters can vary in the amount of work they do to adapt to a target interface. This can be simple can just modifying to fit a text into a visual library, but this may be as complicated as creating an entirely different set of operations depending on the library or Target and perhaps how similar the Target interface is to the Adaptees.

2. **
