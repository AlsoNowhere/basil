import { createCircle } from "../../services/create-circle.service";

import {
  defaultPointColour,
  defaultPointSize,
  textHeight,
} from "../../data/default-data";

export const addCircles = function (data) {
  const pointColour = this.options.pointColour || defaultPointColour;
  const pointSize = this.options.pointSize || defaultPointSize;

  data.forEach((point) => {
    const [cx, cy] = [
      point.x * this.xPart - this.xPart * this.minX + this.offset.x,
      this.graphHeight -
        (point.y * this.yPart - this.yPart * this.minY + this.offset.y),
    ];

    const circle = createCircle(this.element, {
      cx,
      cy,
      r: pointSize,
      style: `stroke:${pointColour};fill:transparent;`,
    });

    circle.addEventListener("mouseenter", () => {
      const [rect, text] = this.tooltip;

      this.element.append(rect);
      this.element.append(text);

      const x =
        cx + 140 + 10 + 5 > this.element.clientWidth
          ? this.element.clientWidth - (140 + 10)
          : cx + 10;

      rect.setAttribute("x", x);
      rect.setAttribute("y", cy + 10);

      text.setAttribute("x", x + 5);
      text.setAttribute("y", cy + 10 + textHeight);

      text.textContent = `${point.label} -- ${point.y}`;
    });

    circle.addEventListener("mouseleave", () => {
      const [rect, text] = this.tooltip;
      rect.parentElement.removeChild(rect);
      text.parentElement.removeChild(text);
    });
  });
};
