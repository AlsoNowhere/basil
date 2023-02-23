export const isValidElement = (element) => {
  const valid =
    element instanceof Element &&
    (element.name === "SVG" || element.name === "canvas");
  return valid;
};
