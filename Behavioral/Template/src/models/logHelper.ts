import { LogTemplate } from "./LogTemplate";

export function logHelper(logger: LogTemplate, message: string) {
  logger.log(message);
}
