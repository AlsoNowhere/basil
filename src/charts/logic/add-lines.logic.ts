import { Line } from "../Line";

import { createLine } from "../../services/create-line.service";

import { ICoords } from "../../interfaces/ICoords.interface";

import {
  defaultLineColour,
  defaultLinkThickness,
  defaultXTextSize,
} from "../../data/default-data";

export const addLines = function (data: Array<ICoords>) {
  const that = this as Line;

  const lineColour = that.options.lineColour || defaultLineColour;
  const lineThickness = that.options.lineThickness || defaultLinkThickness;

  const textSize = defaultXTextSize;
  let pacing = 0;

  data.forEach((point, index) => {
    if (index === 0) {
      pacing += textSize;
      return;
    }
    const [cx, cy] = [
      point.x * that.xPart - that.xPart * that.minX + that.offset.x,
      that.graphHeight -
        (point.y * that.yPart - that.yPart * that.minY + that.offset.y),
    ];

    const previous = data[index - 1];
    const [previousCX, previousCY] = [
      previous.x * that.xPart - that.xPart * that.minX + that.offset.x,
      that.graphHeight -
        (previous.y * that.yPart - that.yPart * that.minY + that.offset.y),
    ];

    if (pacing < textSize) {
      pacing += textSize;
      createLine(that.element, {
        x1: cx,
        y1: 0,
        x2: cx,
        y2: that.graphHeight,
        style: `stroke-width:1px;stroke:lightgrey;`,
      });
    } else {
      pacing = 0;
    }

    createLine(that.element, {
      x1: previousCX,
      y1: previousCY,
      x2: cx,
      y2: cy,
      style: `stroke-width:${lineThickness}px;stroke:${lineColour};`,
    });
  });
};
