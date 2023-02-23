import { createText } from "../../services/create-text.service";

import { defaultPointSize, textHeight } from "../../data/default-data";

export const addLabels = function (data) {
  const pointSize = this.options.pointSize || defaultPointSize;

  createText(this.element, { x: 0, y: textHeight }, this.maxY);
  createText(this.element, { x: 0, y: this.graphHeight }, this.minY);

  data.forEach((point) => {
    const x = point.x * this.xPart - this.xPart * this.minX + this.offset.x + 0;
    const y = this.graphHeight + pointSize;
    createText(
      this.element,
      {
        x,
        y,
        "font-size": (textHeight * 7) / 16,
        style: this.options.xLabelsAreVertical
          ? `transform-origin:${x}px ${y}px;transform:rotate(90deg);`
          : "",
      },
      point.label
    );
  });
};
