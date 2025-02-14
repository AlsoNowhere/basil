import { Line } from "../Line";

import { createText } from "../../services/create-text.service";

import { defaultXTextSize } from "../../data/default-data";
import { createLine } from "../../services/create-line.service";

const transform = (x: number, y: number) =>
  `transform-origin: ${x}px ${y}px; transform: rotate(90deg);`;

export const addLabels = function () {
  const that = this as Line;
  const data = that.lineData;

  // ** Top and bottom of y labels
  // createText(that.element, { x: 0, y: defaultTextHeight }, String(that.maxY));
  // createText(that.element, { x: 0, y: that.graphHeight }, String(that.minY));

  const textSize = defaultXTextSize;
  // let pacing = 0;

  const delta = that.graphWidth / (data.length - 1);

  data.forEach((point, index) => {
    // if (index === data.length - 1) return;
    // const x = point.x * that.xPart - that.xPart * that.minX + that.offset.x + 0;
    // const y = that.graphHeight;
    // if (pacing < textSize) {
    //   pacing += textSize;
    //   createText(
    //     that.element,
    //     {
    //       x,
    //       y,
    //       "font-size": defaultXTextSize,
    //       style: that.options.xLabelsAreVertical ? transform(x, y) : "",
    //     },
    //     point.label
    //   );
    // } else {
    //   pacing = 0;
    // }

    const x = that.offset.x + delta * index - textSize / 2;
    const y = that.offset.y + that.graphHeight + textSize / 2;
    createText(
      that.element,
      {
        x,
        y,
        "font-size": textSize,
        style: that.options.xLabelsAreVertical ? transform(x, y) : "",
      },
      point.label
    );

    if (index !== 0) {
      const x1 = x + textSize / 2;
      createLine(that.element, {
        x1: x1,
        y1: y,
        x2: x1,
        y2: that.offset.y,
        style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
      });
    }
  });
};
