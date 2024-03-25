import { getMax } from "../services/get-max.service";
import { getMin } from "../services/get-min.service";
import { addBorder } from "../services/add-border.service";
import { isValidElement } from "../services/is-valid-element.service";
import { createRect } from "../services/create-rect.service";
import { createText } from "../services/create-text.service";

import { reset } from "./logic/reset.logic";
import { generateChart } from "./logic/generate-chart.logic";
import { addLabels } from "./logic/add-labels.logic";
import { addIntervals } from "./logic/add-intervals.logic";
import { addLines } from "./logic/add-lines.logic";
import { addCircles } from "./logic/add-circles.logic";

import { ICoords } from "../interfaces/ICoords.interface";
import { IOptions } from "../interfaces/IOptions.interface";

import { defaultTextHeight, textLineHeight } from "../data/default-data";

export class Line {
  element: SVGElement;
  options: IOptions;

  tooltip: [SVGRectElement, SVGTextElement];

  graphWidth: number;
  graphHeight: number;

  xPart: number | null;
  yPart: number | null;

  minX: number | null;
  maxX: number | null;

  minY: number;
  maxY: number;

  offset: ICoords;

  reset = reset;
  generateChart = generateChart;
  addBorder = addBorder;
  addLabels = addLabels;
  addIntervals = addIntervals;
  addLines = addLines;
  addCircles = addCircles;

  constructor(
    element: SVGElement,
    lineData: Array<ICoords>,
    options: IOptions = {}
  ) {
    if (!isValidElement(element))
      throw new Error("Element provided to Line not a HTMLElement");

    this.element = element;
    this.options = options;

    this.tooltip = null;

    if (options.tooltip === true) {
      this.tooltip = [
        createRect(element, {
          width: 140,
          height: defaultTextHeight * textLineHeight + 2,
          style: "stroke:#000;stroke-width:1px;fill:#fff;",
        }),
        createText(element),
      ];
    }

    const { clientWidth: width, clientHeight: height } = element;

    this.graphWidth = width * 0.9;
    this.graphHeight = height * 0.9;

    this.xPart = null;
    this.yPart = null;

    this.minX = null;
    this.maxX = null;

    this.minY = options.minY || getMin(lineData, "y");
    this.maxY = (() => {
      const maxY = options.maxY || getMax(lineData, "y");
      return this.minY === maxY ? this.minY + 1 : maxY;
    })();

    this.offset = { x: width * 0.1, y: 0 };

    (function init() {
      this.reset();
      this.generateChart(lineData);
      this.addLabels(lineData);
      this.addIntervals();
      this.addBorder();
    }).apply(this);
  }
}
