export abstract class WebPage {
  protected userContent: HTMLElement;
  protected userArticle: HTMLElement;
  constructor(userContent: HTMLElement, userArticle: HTMLElement) {
    this.userContent = userContent;
    this.userArticle = userArticle;
  }

  displayImage(path: string) {
    this.userContent.innerHTML = `<img src = '${path}' />`;
  }

  displayArticle(article: string) {
    this.userArticle.innerHTML = `<p>${article}</p>`;
  }

  abstract display(): void;
}
