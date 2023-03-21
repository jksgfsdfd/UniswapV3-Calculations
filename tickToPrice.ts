// equation: price = 1.0001 ^ tick

export function getPriceFromTick(
  tick: number,
  decimal0 = 0,
  decimal1 = 0
): number {
  const num = 1.0001 ** tick;
  const price = num * 10 ** (decimal0 - decimal1);
  return price;
}

//console.log(getPriceFromTick(201604, 6, 18));
