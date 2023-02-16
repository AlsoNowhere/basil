import { getMax } from "../services/get-max.service";
import { getMin } from "../services/get-min.service";
import { createLine } from "../services/create-line.service";
import { createCircle } from "../services/create-circle.service";
import { createText } from "../services/create-text.service";

import {
  defaultPointColour,
  defaultLineColour,
  defaultLinkThickness,
  defaultPointSize,
  textHeight,
} from "../data/default-data";

const isValidElement = (element) => {
  const valid =
    element instanceof Element &&
    (element.name === "SVG" || element.name === "canvas");
  return valid;
};

const addBorder = (svg, height, offset) => {
  const { x, y } = offset;

  createLine(svg, {
    x1: x,
    y1: 0,
    x2: x,
    y2: height - y,
    style: "stroke-width:1px;stroke:#000;",
  });

  createLine(svg, {
    x1: x,
    y1: height - y,
    x2: svg.clientWidth,
    y2: height - y,
    style: "stroke-width:1px;stroke:#000;",
  });
};

const generateChart = (svg, width, height, offset, data, options) => {
  const pointColour = options.pointColour || defaultPointColour;
  const lineColour = options.lineColour || defaultLineColour;
  const pointSize = options.pointSize || defaultPointSize;
  const lineThickness = options.lineThickness || defaultLinkThickness;

  const { minY, maxY } = options;

  const minX = getMin(data, "x");
  const maxX = getMax(data, "x");
  const deltaX = maxX - minX;

  const deltaY = maxY - minY;

  const xPart = width / deltaX;
  const yPart = height / deltaY;

  data.forEach((point, index) => {
    if (index === 0) return;
    const [cx, cy] = [
      point.x * xPart - xPart * minX + offset.x,
      height - (point.y * yPart - yPart * minY + offset.y),
    ];

    const previous = data[index - 1];
    const [previousCX, previousCY] = [
      previous.x * xPart - xPart * minX + offset.x,
      height - (previous.y * yPart - yPart * minY + offset.y),
    ];

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", previousCX);
    line.setAttribute("y1", previousCY);
    line.setAttribute("x2", cx);
    line.setAttribute("y2", cy);
    line.setAttribute(
      "style",
      `stroke-width:${lineThickness}px;stroke:${lineColour};`
    );
    svg.append(line);
  });

  data.forEach((point, index) => {
    const [cx, cy] = [
      point.x * xPart - xPart * minX + offset.x,
      height - (point.y * yPart - yPart * minY + offset.y),
    ];

    createCircle(svg, { cx, cy, r: pointSize, style: `fill:${pointColour};` });
  });
};

const addLabels = (svg, height, { minY, maxY }) => {
  createText(svg, { x: 0, y: textHeight }, maxY);
  createText(svg, { x: 0, y: height }, minY);
};

export const Line = function (element, lineData, options = {}) {
  if (isValidElement(element))
    throw new Error("Element provided to Line not a HTMLElement");

  [...element.children].forEach((x) => element.removeChild(x));

  const { clientWidth: width, clientHeight: height } = element;

  const graphWidth = width * 0.9;
  const graphHeight = height * 0.9;

  const minY = options.minY || getMin(lineData, "y");
  let maxY = options.maxY || getMax(lineData, "y");

  if (minY === maxY) {
    maxY = minY + 1;
  }

  addBorder(element, graphHeight, { x: width * 0.1, y: 0 });

  generateChart(
    element,
    graphWidth,
    graphHeight,
    { x: width * 0.1, y: 0 },
    lineData,
    { ...options, minY, maxY }
  );

  addLabels(element, graphHeight, { minY, maxY });
};
