const logWindow = document?.querySelector(".log");

export abstract class LogTemplate {
  public log(message: string) {
    this.notify();
    this.saveLog(message);
    this.highTierNotify();
  }

  protected saveLog(message: string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    logWindow?.appendChild(li);
  }

  protected abstract notify(): void;

  protected highTierNotify() {}
}
