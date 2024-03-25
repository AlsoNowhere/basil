import { Line } from "../Line";

import { createLine } from "../../services/create-line.service";
import { createText } from "../../services/create-text.service";
import { round } from "../../services/round.service";
import { toSignificantFigures } from "../../services/to-significant-figures.service";

import { defaultTextHeight } from "../../data/default-data";

export const addIntervals = function () {
  const that = this as Line;

  const yTextsWeCanHave = Math.floor(
    (that.element.clientHeight - defaultTextHeight) / (defaultTextHeight * 2)
  );

  const interval = Number(
    toSignificantFigures(String((that.maxY - that.minY) / yTextsWeCanHave), 3)
  );

  const intervals = [0];
  const delta = that.maxY - that.minY;

  let i = interval;
  while (i <= delta) {
    intervals.push(i);
    i += interval;
  }

  intervals.forEach((i) => {
    const yIndexPart = (that.minY + i) * that.yPart;
    const yIndexPartPrevious = that.yPart * that.minY;
    const offset = that.offset.y;
    const y = that.graphHeight - (yIndexPart - yIndexPartPrevious + offset);

    createLine(that.element, {
      x1: that.offset.x,
      y1: y,
      x2: that.offset.x + that.graphWidth,
      y2: y,
      style: `stroke-width:1px;stroke:lightgrey;`,
    });

    const value = round(that.minY + i);

    createText(that.element, { x: 0, y: y }, String(value));
  });
};
