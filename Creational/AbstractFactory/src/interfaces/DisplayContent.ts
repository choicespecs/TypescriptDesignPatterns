// Abstract Factory Pattern — AbstractProduct interface (Content)
// Implemented by TextContent and ImageContent to define the content component contract.

/**
 * AbstractProduct interface for the Content component.
 * TextContent renders Lorem Ipsum paragraphs; ImageContent renders an Unsplash image.
 */
export interface DisplayContent {
  /** Fills the content area with this theme's specific content (text or image). */
  display(): void;
}
