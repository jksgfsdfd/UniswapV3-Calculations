import { tickSpacingFromFee } from "./constants";

export function getRangeTicksFromCurrentTick(currentTick: number, fee: number) {
  const tickSpacing =
    tickSpacingFromFee[fee as keyof typeof tickSpacingFromFee];
  const lowerTick = currentTick - (currentTick % tickSpacing);
  const higherTick = lowerTick + tickSpacing;
  return {
    lowerTick,
    higherTick,
  };
}
