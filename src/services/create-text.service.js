export const createText = (svgElement, attributes, textContent) => {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  Object.entries(attributes).forEach(([key, value]) => {
    text.setAttribute(key, value);
  });
  text.textContent = textContent;
  svgElement.append(text);
};
