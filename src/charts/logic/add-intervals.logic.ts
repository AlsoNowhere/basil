import { Line } from "../Line";

import { createLine } from "../../services/create-line.service";
import { createText } from "../../services/create-text.service";
// import { round } from "../../services/round.service";
import { toSignificantFigures } from "../../services/to-significant-figures.service";

import { defaultTextHeight } from "../../data/default-data";

export const addIntervals = function () {
  const that = this as Line;

  // const yTextsWeCanHave = Math.floor(
  //   (that.element.clientHeight - defaultTextHeight) / (defaultTextHeight * 2)
  // );

  // const interval = Number(
  //   toSignificantFigures(String((that.maxY - that.minY) / yTextsWeCanHave), 3)
  // );

  // const intervals = [0];
  // const delta = that.maxY - that.minY;
  const intervals = [];

  {
    let i = that.minY;
    while (i < that.maxY) {
      intervals.push(i);
      i = Number(toSignificantFigures(i + that.options.interval, 3));
    }
  }

  const spacing = that.graphHeight / intervals.length;

  intervals.push(that.maxY);

  // {
  //   let i = interval;
  //   while (i <= delta) {
  //     intervals.push(i);
  //     i += interval;
  //   }
  // }

  const x1 = that.offset.x;
  const x2 = that.offset.x + that.graphWidth;

  intervals.reverse().forEach((interval, index) => {
    //   const yIndexPart = (that.minY + i) * that.yPart;
    //   const yIndexPartPrevious = that.yPart * that.minY;
    //   const offset = that.offset.y;
    //   const y = that.graphHeight - (yIndexPart - yIndexPartPrevious + offset);

    const y = that.offset.y + spacing * index;

    if (index !== intervals.length - 1) {
      createLine(that.element, {
        x1,
        y1: y,
        x2,
        y2: y,
        style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
      });
    }

    //   const value = round(that.minY + i);

    createText(
      that.element,
      { x: that.options.pointSize, y: y + defaultTextHeight / 2 },
      String(interval)
    );
  });
};
