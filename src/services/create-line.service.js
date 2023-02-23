export const createLine = (svgElement, attributes) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  Object.entries(attributes).forEach(([key, value]) => {
    line.setAttribute(key, value);
  });

  svgElement.append(line);
};
