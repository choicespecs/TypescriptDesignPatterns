import { Observer } from "./Observer";

export interface Subject {
  add(observer: Observer): void;
  remove(observer: Observer): void;
  notify(): void;
}
