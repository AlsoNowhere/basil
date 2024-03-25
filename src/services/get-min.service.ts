import { ICoords } from "../interfaces/ICoords.interface";

export const getMin = (data: Array<ICoords>, property: string): number => {
  return data.reduce((a, b) => (b[property] < a ? b[property] : a), Infinity);
};
