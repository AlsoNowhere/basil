export const getMin = (data, property) => {
  return data.reduce((a, b) => (b[property] < a ? b[property] : a), Infinity);
};
