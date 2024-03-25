export const isValidElement = (element: SVGElement) => {
  const valid = element.nodeName === "svg" || element.nodeName === "canvas";

  return valid;
};
