import { Data } from "../types/Data";

export interface Database {
  insert(data: Data): void;
  delete(data: Data): void;
}
