export const createCircle = (svgElement, attributes) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  Object.entries(attributes).forEach(([key, value]) => {
    circle.setAttribute(key, value);
  });

  svgElement.append(circle);

  return circle;
};
