import { textHeight } from "../data/default-data";

export const createText = (svgElement, attributes = {}, textContent = "") => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("font-size", textHeight);

  Object.entries(attributes).forEach(([key, value]) => {
    text.setAttribute(key, value);
  });

  text.textContent = textContent;

  svgElement.append(text);

  return text;
};
