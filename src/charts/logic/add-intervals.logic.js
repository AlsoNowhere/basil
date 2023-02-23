import { createLine } from "../../services/create-line.service";
import { createText } from "../../services/create-text.service";

import { textHeight } from "../../data/default-data";

export const addIntervals = function () {
  const interval = 0.2;
  const intervals = [];
  const delta = this.maxY - this.minY;

  let i = interval;
  while (i < delta) {
    intervals.push(i);
    i += interval;
  }

  intervals.forEach((i, index) => {
    const y =
      this.graphHeight -
      ((this.minY + i) * this.yPart - this.yPart * this.minY + this.offset.y);
    createLine(this.element, {
      x1: this.offset.x,
      y1: y,
      x2: this.offset.x + this.graphWidth,
      y2: y,
      style: `stroke-width:1px;stroke:lightgrey;`,
    });

    index !== intervals.length - 1 &&
      createText(this.element, { x: 0, y: y + textHeight / 2 }, this.minY + i);
  });
};
