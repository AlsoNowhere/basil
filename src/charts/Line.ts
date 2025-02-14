import { addBorder } from "../services/add-border.service";
import { isValidElement } from "../services/is-valid-element.service";
import { createRect } from "../services/create-rect.service";
import { createText } from "../services/create-text.service";

import { reset } from "./logic/reset.logic";
import { resolveInformation } from "./logic/resolve-information.logic";
import { generateChartLines } from "./logic/generate-chart-lines.logic";
import { addLabels } from "./logic/add-labels.logic";
import { addIntervals } from "./logic/add-intervals.logic";
import { addLines } from "./logic/add-lines.logic";
import { addCircles } from "./logic/add-circles.logic";

import { ICoords } from "../interfaces/ICoords.interface";
import { IOptions } from "../interfaces/IOptions.interface";
import { IInitOptions } from "../interfaces/IInitOptions.interface";

import { defaultTextHeight, textLineHeight } from "../data/default-data";
import { resolveOptions } from "./logic/resolve-options.logic";

export class Line {
  element: SVGElement;
  lineData: Array<ICoords>;
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
  resolveInformation = resolveInformation;
  generateChartLines = generateChartLines;
  addBorder = addBorder;
  addLabels = addLabels;
  addIntervals = addIntervals;
  addLines = addLines;
  addCircles = addCircles;

  constructor(
    element: SVGElement,
    lineData: Array<ICoords>,
    options: IInitOptions = {}
  ) {
    if (!isValidElement(element))
      throw new Error("Element provided to Line not a HTMLElement");

    this.element = element;
    this.lineData = lineData;
    this.options = resolveOptions(options, lineData);

    this.tooltip = null;

    if (this.options.tooltip === true) {
      this.tooltip = [
        createRect(element, {
          width: 140,
          height: defaultTextHeight * textLineHeight + 2,
          style: "stroke: #000; stroke-width: 1px; fill: #fff;",
        }),
        createText(element),
      ];
    }

    this.graphWidth = null;
    this.graphHeight = null;

    this.xPart = null;
    this.yPart = null;

    this.minX = null;
    this.maxX = null;

    this.minY = null;
    this.maxY = null;

    (function init() {
      this.reset();
      this.resolveInformation();

      this.addBorder();
      this.addIntervals();
      this.addLabels();
      this.generateChartLines();
    }).apply(this);
  }
}
