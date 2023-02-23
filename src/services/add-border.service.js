import { createLine } from "./create-line.service";

import { defaultBorderColour } from "../data/default-data";

export const addBorder = function () {
  const borderColour = this.options.borderColour || defaultBorderColour;

  const { x, y } = this.offset;

  const common = {
    x1: x,
    y2: this.graphHeight - y,
    style: `stroke-width:1px;stroke:${borderColour};`,
  };

  createLine(this.element, {
    ...common,
    y1: 0,
    x2: x,
  });

  createLine(this.element, {
    ...common,
    y1: this.graphHeight - y,
    x2: this.element.clientWidth,
  });
};
