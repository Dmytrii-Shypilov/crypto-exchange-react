
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
  const number =Number(num)
  if (number > 1) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } else {
    return num
  }
  
}


const formatTradeNums = (
  targetObj: Record<string, string>,
  ignoreKey: string = ""
): Record<string, string> => {
  // Create a new object to store the formatted values
  const formattedObj: Record<string, string> = {};

  for (const key in targetObj) {
    if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
      // If the key is not the ignoreKey, format the value
      formattedObj[key] =
        key !== ignoreKey
          ? convertToUs(targetObj[key])
          : targetObj[key];
    }
  }

  return formattedObj;
};

export const formatNumber = {
  convertToUs,
  abreviateNumber,
  formatTradeNums
}