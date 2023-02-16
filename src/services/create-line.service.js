export const createLine = (svgElement, attributes) => {
  //   const { x1, y1, x2, y2, style } = attributes;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  // line.setAttribute("x1", x1);
  // line.setAttribute("y1", y1);
  // line.setAttribute("x2", x2);
  // line.setAttribute("y2", y2);
  // line.setAttribute("style", style);
  Object.entries(attributes).forEach(([key, value]) => {
    line.setAttribute(key, value);
  });
  svgElement.append(line);
};
