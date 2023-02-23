export const createRect = (svgElement, attributes) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  Object.entries(attributes).forEach(([key, value]) => {
    rect.setAttribute(key, value);
  });

  svgElement.append(rect);

  return rect;
};
