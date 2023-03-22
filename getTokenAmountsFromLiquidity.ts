import { getRangeTicksFromCurrentTick } from "./getRangeTicksFromCurrentTick";
import { getPriceFromTick, getTickFromPrice } from "./tickToPriceConversion";
import BigNumber from "bignumber.js";
import { logComparison } from "./utils/comparisonWriter";
import { getPriceFromSqrtPriceX96 } from "./sqrtPriceX96ToPrice";

export function getTokenAmountsFromLiquidity(
  liquidity: string,
  sqrtPriceX96: string,
  tickLower: number,
  tickUpper: number,
  decimal0 = 0,
  decimal1 = 0
) {
  // since for calcualtion we need the virtual amounts, we will keep it as it is
  const liquidityBigint = BigNumber(liquidity);

  const lowerPrice = BigNumber(getPriceFromTick(tickLower));
  const higherPrice = BigNumber(getPriceFromTick(tickUpper));
  const currentSqrt = BigNumber(sqrtPriceX96).dividedBy(
    BigNumber(2).exponentiatedBy(BigNumber(96))
  );
  const currentTick = getTickFromPrice(getPriceFromSqrtPriceX96(sqrtPriceX96));
  console.log(currentTick);

  const lowerSqrt = lowerPrice.squareRoot();
  const higherSqrt = higherPrice.squareRoot();

  logComparison(
    {
      header: "Maanas",
      currentSqrt: currentSqrt.toString(),
      lowerSqrt: lowerSqrt.toString(),
      higherSqrt: higherSqrt.toString(),
    },
    "squareRoots",
    false
  );
  // the difference from my calculation to that of Racheals and the Uniswap interface was due to me taking the price from current tick than the sqrtPriceX96. Calculating sqrtPrice from tick will result in slight error.

  let token0Amount = BigNumber(0);
  let token1Amount = BigNumber(0);
  if (currentTick > tickUpper) {
    // the entire liquidity is made of token1
    token1Amount = liquidityBigint.multipliedBy(higherSqrt.minus(lowerSqrt));
  } else if (currentTick < tickLower) {
    // the enitre liquidity is made of token0
    token0Amount = liquidityBigint
      .dividedBy(lowerSqrt)
      .minus(liquidityBigint.dividedBy(higherSqrt));
  } else {
    token0Amount = liquidityBigint
      .dividedBy(currentSqrt)
      .minus(liquidityBigint.dividedBy(higherSqrt));

    token1Amount = liquidityBigint.multipliedBy(currentSqrt.minus(lowerSqrt));
  }
  return {
    token0Amount: Number(token0Amount) / 10 ** decimal0,
    token1Amount: Number(token1Amount) / 10 ** decimal1,
  };
}

export function getVirtualTokenAmountsFromLiquidity(
  liquidity: string,
  currentTick: number,
  decimal0 = 0,
  decimal1 = 0
) {
  const currentPrice = BigNumber(getPriceFromTick(currentTick));
  const liquidityInt = BigNumber(liquidity);
  const token0VirtualAmount = liquidityInt.dividedBy(currentPrice.squareRoot());
  const token1VirtualAmount = liquidityInt.multipliedBy(
    currentPrice.squareRoot()
  );
  return {
    token0VirtualAmount: Number(token0VirtualAmount) / 10 ** decimal0,
    token1VirtualAmount: Number(token1VirtualAmount) / 10 ** decimal1,
  };
}

console.log(
  getTokenAmountsFromLiquidity(
    "26492957036395158274",
    "1864819009629035330514366652533044",
    201330,
    201340,
    6,
    18
  )
);
