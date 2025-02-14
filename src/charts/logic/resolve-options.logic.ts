import { getMin } from "../../services/get-min.service";
import { getMax } from "../../services/get-max.service";

import { ICoords } from "../../interfaces/ICoords.interface";
import { IOptions } from "../../interfaces/IOptions.interface";
import { IInitOptions } from "../../interfaces/IInitOptions.interface";

import {
  defaultBorderColour,
  defaultInterval,
  defaultLineColour,
  defaultLinkThickness,
  defaultPointColour,
  defaultPointSize,
} from "../../data/default-data";

export const resolveOptions = (
  _options: IInitOptions,
  lineData: Array<ICoords>
) => {
  const options: IOptions = {
    tooltip: _options.tooltip ?? false,
    minY: _options.minY ?? getMin(lineData, "y"),
    maxY: _options.maxY ?? getMax(lineData, "y"),
    borderColour: _options.borderColour ?? defaultBorderColour,
    lineColour: _options.lineColour ?? defaultLineColour,
    lineThickness: _options.lineThickness ?? defaultLinkThickness,
    pointColour: _options.pointColour ?? defaultPointColour,
    pointSize: _options.pointSize ?? defaultPointSize,
    xLabelsAreVertical: _options.xLabelsAreVertical ?? true,
    interval: _options.interval ?? defaultInterval,
  };

  return options;
};
