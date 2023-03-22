import * as fs from "fs";

function generateNHashSymbol(n: number): string {
  let hashString = "";
  for (let i = 0; i < n; i++) {
    hashString += "#";
  }
  return hashString;
}

function generateNDashSymbol(n: number): string {
  let hashString = "";
  for (let i = 0; i < n; i++) {
    hashString += "-";
  }
  return hashString;
}

export function logComparison(
  logObject: { [key: string]: any },
  fileName: string,
  appending: boolean
) {
  // if logobject has an header property, we will insert that in a special format and then write the rest of the logobject
  let writeString = "";
  if (logObject["header"]) {
    writeString += generateNHashSymbol(100) + "\n";
    writeString += logObject["header"] + "\n";
    writeString += generateNHashSymbol(100) + "\n";
    delete logObject["header"];
  }

  const result = Object.entries(logObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  writeString += result + "\n";
  writeString += generateNDashSymbol(100) + "\n";
  const filePath =
    "/home/ronmaa/CS/Web3/Uniswap/UniswapV3/Uniswap-Calculations/comparisons/" +
    fileName;
  if (appending) {
    fs.appendFileSync(filePath, writeString);
  } else {
    fs.writeFileSync(filePath, writeString);
  }
}
