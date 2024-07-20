export interface Command {
  execute(): any;
  undo(): any;
}
