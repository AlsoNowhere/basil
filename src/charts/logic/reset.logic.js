export const reset = function () {
  [...this.element.children].forEach((x) => this.element.removeChild(x));
};
