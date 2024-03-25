export const createCircle = (
  svgElement: SVGElement,
  attributes: Record<string, string | number>
) => {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  Object.entries(attributes).forEach(([key, value]) => {
    circle.setAttribute(key, String(value));
  });

  svgElement.append(circle);

  return circle;
};
