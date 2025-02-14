import { Line } from "../Line";

import { getMax } from "../../services/get-max.service";
import { getMin } from "../../services/get-min.service";

export const resolveInformation = function () {
  const that = this as Line;
  const element = that.element;
  const data = that.lineData;

  const { clientWidth: width, clientHeight: height } = element;

  // This is the edge around the SVG elements and the SVG Element.
  const gap = that.options.pointSize * 2;

  that.graphWidth = width * 0.9 - gap;
  this.graphHeight = height * 0.9 - gap;

  that.minX = getMin(data, "x");
  that.maxX = getMax(data, "x");

  this.minY = this.options.minY;
  this.maxY = (() => {
    const maxY = this.options.maxY;
    return this.minY === maxY ? this.minY + 1 : maxY;
  })();

  this.offset = { x: width * 0.1, y: gap };

  const deltaX = that.maxX - that.minX;
  const deltaY = that.maxY - that.minY;

  that.xPart = that.graphWidth / deltaX;
  that.yPart = that.graphHeight / deltaY;
};
