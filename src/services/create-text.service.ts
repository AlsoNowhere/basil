import { defaultTextHeight } from "../data/default-data";

export const createText = (
  svgElement: SVGElement,
  attributes: Record<string, string | number> = {},
  textContent = ""
) => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("font-size", defaultTextHeight.toString());

  Object.entries(attributes).forEach(([key, value]) => {
    text.setAttribute(key, String(value));
  });

  text.textContent = textContent;

  svgElement.append(text);

  return text;
};
