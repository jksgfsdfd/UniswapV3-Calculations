import { getRangeTicksFromCurrentTick } from "./getRangeTicksFromCurrentTick";
import { getPriceFromTick } from "./tickToPrice";

// Lower tick = current tick - (current tick % tickspacing) , higher tick = lower tick + tickspacing

export function getPriceRangeFromCurrentTick(
  currentTick: number,
  fee: number,
  decimal0 = 0,
  decimal1 = 0
) {
  const { lowerTick, higherTick } = getRangeTicksFromCurrentTick(
    currentTick,
    fee
  );
  const lowerPriceRange = getPriceFromTick(lowerTick, decimal0, decimal1);
  const higherPriceRange = getPriceFromTick(higherTick, decimal0, decimal1);
  return {
    lowerPriceRange,
    higherPriceRange,
  };
}

export function getPriceRangeFromCurrentTickInToken1Terms(
  currentTick: number,
  fee: number,
  decimal0 = 0,
  decimal1 = 0
) {
  const { lowerPriceRange, higherPriceRange } = getPriceRangeFromCurrentTick(
    currentTick,
    fee,
    decimal0,
    decimal1
  );
  return {
    lowerPriceRange: 1 / higherPriceRange,
    higherPriceRange: 1 / lowerPriceRange,
  };
}

console.log(getPriceRangeFromCurrentTick(201639, 60, 6, 18));
