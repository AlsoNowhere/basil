export const createRect = (
  svgElement: SVGElement,
  attributes: Record<string, string | number>
) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  Object.entries(attributes).forEach(([key, value]) => {
    rect.setAttribute(key, String(value));
  });

  svgElement.append(rect);

  return rect;
};
