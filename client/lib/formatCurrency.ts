interface Options {
  style: string;
  currency: string;
  minimumFractionDigits: number;
}

const defaultOptions = {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2
};

const formatCurrency = (
  amount: number,
  options: Options = defaultOptions,
  format: string = 'en-GB'
) => {
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat(format, options);
  return formatter.format(amount);
};

export default formatCurrency;
