import { Line } from "../charts/Line";

import { createLine } from "./create-line.service";
// import { createRect } from "./create-rect.service";

export const addBorder = function () {
  const that = this as Line;

  const { x: x1, y } = that.offset;

  const y1 = that.graphHeight + y;

  const common = {
    x1,
    y1,
    style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
    // style: `stroke-width: 5px; stroke: pink;`,
  };

  // Vertical
  createLine(that.element, {
    ...common,
    x2: x1,
    y2: y,
  });

  // Horizontal
  createLine(that.element, {
    ...common,
    x2: x1 + that.graphWidth,
    y2: y1,
  });

  // createRect(that.element, {
  //   x: that.offset.x,
  //   y: that.offset.y,
  //   width: that.graphWidth,
  //   height: that.graphHeight,
  //   style: "fill: rgba(0, 100, 0, 0.2);",
  // });
};
