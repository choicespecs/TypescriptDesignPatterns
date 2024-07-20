export class ImageFactory {
  private imageCache: Map<string, HTMLImageElement> = new Map();

  getImage(src: string): HTMLImageElement {
    if (!this.imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      this.imageCache.set(src, img);
    }
    return this.imageCache.get(src)!;
  }
}
