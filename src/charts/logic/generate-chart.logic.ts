import { Line } from "../Line";

import { getMax } from "../../services/get-max.service";
import { getMin } from "../../services/get-min.service";

import { ICoords } from "../../interfaces/ICoords.interface";

export const generateChart = function (data: Array<ICoords>) {
  const that = this as Line;

  that.minX = getMin(data, "x");
  that.maxX = getMax(data, "x");

  const deltaX = that.maxX - that.minX;
  const deltaY = that.maxY - that.minY;

  that.xPart = that.graphWidth / deltaX;
  that.yPart = that.graphHeight / deltaY;

  that.addLines.apply(that, [data]);

  that.addCircles.apply(that, [data]);
};
