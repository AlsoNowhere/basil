import { Line } from "../Line";

export const reset = function () {
  const that = this as Line;
  Array.from(that.element.children).forEach((x) => that.element.removeChild(x));
};
