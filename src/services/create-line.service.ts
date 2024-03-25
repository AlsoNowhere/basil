export const createLine = (
  svgElement: SVGElement,
  attributes: Record<string, string | number>
) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  Object.entries(attributes).forEach(([key, value]) => {
    line.setAttribute(key, String(value));
  });

  svgElement.append(line);
};
