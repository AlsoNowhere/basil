export const toSignificantFigures = (str: string, figures: number) => {
  const digits = str.split("");
  if (digits[0] === "0" && digits[1] !== ".") {
    throw "Whoops";
  }
  let i = 0;
  let added = 0;
  const output = [];
  while (i < digits.length && added < figures) {
    const item = digits[i];
    i++;

    output.push(item);
    if (item === ".") continue;
    if (item === "0" && added === 0) continue;
    added++;
  }
  return output.join("");
};
