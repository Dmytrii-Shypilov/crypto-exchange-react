

const abreviateNumber = (number: string | number) => {
  const num = Number(number);

  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).toString() + "M";
  } else if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(2).toString() + "K";
  } else {
    return num.toFixed(4).toString();
  }
};

const convertToUs = (num: string) => {
  const number = Number(num);
  if (number > 1) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } else {
    return num;
  }
};

const removeExtraZeros = (num: string) => {
  const number = Number(num.replace('-', ''));

  if (number > 1) {
    return number.toFixed(2);
  }
  return num;
};

const formatTradeNums = (
  targetObj: Record<string, string>,
  ignoreKeys: string[]
): Record<string, string> => {
  const formattedObj: Record<string, string> = {};

  for (const key in targetObj) {
    if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
      formattedObj[key] = !ignoreKeys.includes(key)
        ? convertToUs(targetObj[key])
        : removeExtraZeros(targetObj[key]);
    }
  }

  return formattedObj;
};



export const doOperation = (num: string, operation: "+" | "-") => {
  const number = Number(num);
  if (number < 1 && number !== 0) {
    const dig = Number(num.split(".")[1]);
    const n = operation === "-" ? String(dig - 1) : String(dig + 1);

    const sliceTo =
      n.length > dig.toString().length && n.length !== dig.toString().length
        ? num.length - n.length
        : -n.length;
    const f = num.slice(0, sliceTo).replace("1", "0");

    return f + n;
  } else {
    return operation === "-" ? String(number - 1) : String(number + 1);
  }
};



export const formatNumber = {
  convertToUs,
  abreviateNumber,
  removeExtraZeros,
formatTradeNums
};
