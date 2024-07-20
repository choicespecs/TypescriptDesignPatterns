import { Calculator } from "../interfaces/Calculator";

export class Multiply implements Calculator {
  calculate(num1: number, num2: number) {
    return num1 * num2;
  }
}
