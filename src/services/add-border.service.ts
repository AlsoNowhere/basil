import { Line } from "../charts/Line";

import { createLine } from "./create-line.service";

import { defaultBorderColour } from "../data/default-data";

export const addBorder = function () {
  const that = this as Line;

  const borderColour = that.options.borderColour || defaultBorderColour;

  const { x, y } = that.offset;

  const common = {
    x1: x,
    y2: that.graphHeight - y,
    style: `stroke-width:1px;stroke:${borderColour};`,
  };

  createLine(that.element, {
    ...common,
    y1: 0,
    x2: x,
  });

  createLine(that.element, {
    ...common,
    y1: that.graphHeight - y,
    x2: that.element.clientWidth,
  });
};
