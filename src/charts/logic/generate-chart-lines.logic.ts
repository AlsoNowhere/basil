import { Line } from "../Line";

export const generateChartLines = function () {
  const that = this as Line;
  const data = that.lineData;

  that.addLines.apply(that, [data]);

  that.addCircles.apply(that, [data]);
};
