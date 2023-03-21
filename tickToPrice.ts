// equation: price = 1.0001 ^ tick

interface PriceOutput {
  priceOfToken0inToken1: number;
  priceOfToken1inToken0: number;
}

function getPrice(tick: number, decimal0 = 0, decimal1 = 0): PriceOutput {
  const num = 1.0001 ** tick;
  const priceOfToken0inToken1 = num * 10 ** (decimal0 - decimal1);
  const priceOfToken1inToken0 = 1 / priceOfToken0inToken1;
  return {
    priceOfToken0inToken1,
    priceOfToken1inToken0,
  };
}

console.log(getPrice(201604, 6, 18));
