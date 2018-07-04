export const formatDate = format => moment => moment.format(format);

export const limitDecimals = decimals => number =>
  Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);

export const parseFloatIfNecessary = number =>
  Number.isInteger(number) ? number : parseFloat(number);
