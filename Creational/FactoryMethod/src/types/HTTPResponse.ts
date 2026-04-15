// Factory Method Pattern — Shared data type
// Carries the HTTP response code and optional content/article that factories use to select a WebPage.

/**
 * Data object passed to factory methods.
 * The code field drives which WebPage subclass is created;
 * content and article supply the page's image URL and text body.
 */
export type HTTPResponse = {
  code: number;
  content?: string;
  article?: string;
};
