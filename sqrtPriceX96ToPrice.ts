// equation: price = (sqrtPriceX96 / 2**96)^2

export function convertSqrtX96ToPrice(
  sqrtPriceX96: string,
  decimal0 = 0,
  decimal1 = 0
) {
  const sqrtPriceX96InInt = BigInt(sqrtPriceX96);
  const num = (sqrtPriceX96InInt / BigInt(2) ** BigInt(96)) ** BigInt(2);
  const price = Number(num) * 10 ** (decimal0 - decimal1);
  return price;
}

//console.log(convertSqrtX96ToPrice("1889911091782837996617859286428373", 6, 18));
