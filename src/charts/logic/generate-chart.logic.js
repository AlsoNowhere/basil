import { getMax } from "../../services/get-max.service";
import { getMin } from "../../services/get-min.service";

export const generateChart = function (data) {
  this.minX = getMin(data, "x");
  this.maxX = getMax(data, "x");

  const deltaX = this.maxX - this.minX;
  const deltaY = this.maxY - this.minY;

  this.xPart = this.graphWidth / deltaX;
  this.yPart = this.graphHeight / deltaY;

  this.addLines.apply(this, [data]);

  this.addCircles.apply(this, [data]);
};
