// equation: price = (sqrtPriceX96 / 2**96)^2

export function getPriceFromSqrtPriceX96(
  sqrtPriceX96: string,
  decimal0 = 0,
  decimal1 = 0
) {
  const num = (Number(sqrtPriceX96) / 2 ** 96) ** 2;
  const price = num * 10 ** (decimal0 - decimal1);
  return price;
}

//console.log(convertSqrtX96ToPrice("1889911091782837996617859286428373", 6, 18));
