// equation: price = (sqrtPriceX96 / 2**96)^2

interface PriceOutput {
  priceOfToken0inToken1: number;
  priceOfToken1inToken0: number;
}

function getPrice(
  sqrtPriceX96: string,
  decimal0 = 0,
  decimal1 = 0
): PriceOutput {
  const sqrtPriceX96InInt = BigInt(sqrtPriceX96);
  const num = (sqrtPriceX96InInt / BigInt(2) ** BigInt(96)) ** BigInt(2);
  const priceOfToken0inToken1 = Number(num) * 10 ** (decimal0 - decimal1);
  const priceOfToken1inToken0 = 1 / priceOfToken0inToken1;
  return {
    priceOfToken0inToken1,
    priceOfToken1inToken0,
  };
}

console.log(getPrice("1889911091782837996617859286428373", 6, 18));
