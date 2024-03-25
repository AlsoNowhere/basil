import { Line } from "../Line";

import { createText } from "../../services/create-text.service";

import { ICoords } from "../../interfaces/ICoords.interface";

import {
  defaultPointSize,
  defaultTextHeight,
  defaultXTextSize,
} from "../../data/default-data";

export const addLabels = function (data: Array<ICoords>) {
  const that = this as Line;

  const pointSize = that.options.pointSize || defaultPointSize;

  // ** Top and bottom of y labels
  // createText(that.element, { x: 0, y: defaultTextHeight }, String(that.maxY));
  // createText(that.element, { x: 0, y: that.graphHeight }, String(that.minY));

  const textSize = defaultXTextSize;
  let pacing = 0;

  data.forEach((point, index) => {
    if (index === data.length - 1) return;

    const x = point.x * that.xPart - that.xPart * that.minX + that.offset.x + 0;
    const y = that.graphHeight + pointSize;

    if (pacing < textSize) {
      pacing += textSize;

      createText(
        that.element,
        {
          x,
          y,
          "font-size": defaultXTextSize,
          style: that.options.xLabelsAreVertical
            ? `transform-origin:${x}px ${y}px;transform:rotate(90deg);`
            : "",
        },
        point.label
      );
    } else {
      pacing = 0;
    }
  });
};
