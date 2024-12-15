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

const formatTradeNums = (
  targetObj: Record<string, string>,
  ignoreKey: string = ""
): Record<string, string> => {
  const formattedObj: Record<string, string> = {};

  for (const key in targetObj) {
    if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
      formattedObj[key] =
        key !== ignoreKey ? convertToUs(targetObj[key]) : targetObj[key];
    }
  }

  return formattedObj;
};

export function getLeastUnit(num: string) {
  const numStr = num.toString();

  if (numStr.includes('.')) {
    // Get the fractional part of the number
    const fraction = numStr.split('.')
    console.log(fraction)

    // Find the number of significant decimal places
    const decimalPlaces = fraction[1].endsWith('0') ? fraction[1].length+1 : fraction[1].length; 
    
    // Find the smallest unit by using the last significant digit
    const leastUnit = Math.pow(10, -decimalPlaces); 

    return { num: leastUnit, dec: decimalPlaces };
  } else {
    // If it's an integer, the least unit is 1
    return { num: 1, dec: 0 };
  }
}



export const formatNumber = {
  convertToUs,
  abreviateNumber,
  formatTradeNums,
};
