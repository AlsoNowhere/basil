import { Line } from "../Line";

import { createCircle } from "../../services/create-circle.service";

import { ICoords } from "../../interfaces/ICoords.interface";

import {
  defaultPointColour,
  defaultPointSize,
  defaultTextHeight,
} from "../../data/default-data";

export const addCircles = function (data: Array<ICoords>) {
  const that = this as Line;

  const pointColour = that.options.pointColour || defaultPointColour;
  const pointSize = that.options.pointSize || defaultPointSize;

  data.forEach((point) => {
    const [cx, cy] = [
      point.x * that.xPart - that.xPart * that.minX + that.offset.x,
      that.graphHeight -
        (point.y * that.yPart - that.yPart * that.minY + that.offset.y),
    ];

    const circle = createCircle(that.element, {
      cx,
      cy,
      r: pointSize,
      style: `stroke:${pointColour};fill:transparent;`,
    });

    circle.addEventListener("mouseenter", () => {
      const [rect, text] = that.tooltip;

      that.element.append(rect);
      that.element.append(text);

      const x =
        cx + 140 + 10 + 5 > that.element.clientWidth
          ? that.element.clientWidth - (140 + 10)
          : cx + 10;

      rect.setAttribute("x", String(x));
      rect.setAttribute("y", String(cy + 10));

      text.setAttribute("x", String(x + 5));
      text.setAttribute("y", String(cy + 10 + defaultTextHeight));

      text.textContent = `${point.label} -- ${point.y}`;
    });

    circle.addEventListener("mouseleave", () => {
      const [rect, text] = that.tooltip;
      rect.parentElement.removeChild(rect);
      text.parentElement.removeChild(text);
    });
  });
};
