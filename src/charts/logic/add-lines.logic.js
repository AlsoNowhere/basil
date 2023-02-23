import { createLine } from "../../services/create-line.service";

import {
  defaultLineColour,
  defaultLinkThickness,
} from "../../data/default-data";

export const addLines = function (data) {
  const lineColour = this.options.lineColour || defaultLineColour;
  const lineThickness = this.options.lineThickness || defaultLinkThickness;

  data.forEach((point, index) => {
    if (index === 0) return;
    const [cx, cy] = [
      point.x * this.xPart - this.xPart * this.minX + this.offset.x,
      this.graphHeight -
        (point.y * this.yPart - this.yPart * this.minY + this.offset.y),
    ];

    const previous = data[index - 1];
    const [previousCX, previousCY] = [
      previous.x * this.xPart - this.xPart * this.minX + this.offset.x,
      this.graphHeight -
        (previous.y * this.yPart - this.yPart * this.minY + this.offset.y),
    ];

    createLine(this.element, {
      x1: cx,
      y1: 0,
      x2: cx,
      y2: this.graphHeight,
      style: `stroke-width:1px;stroke:lightgrey;`,
    });

    createLine(this.element, {
      x1: previousCX,
      y1: previousCY,
      x2: cx,
      y2: cy,
      style: `stroke-width:${lineThickness}px;stroke:${lineColour};`,
    });
  });
};
