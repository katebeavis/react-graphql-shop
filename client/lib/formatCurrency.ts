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

interface FormatCurrency {
  amount: number;
  options?: Options;
  format?: string;
}

const formatCurrency = ({
  amount,
  options = defaultOptions,
  format = 'en-GB'
}: FormatCurrency) => {
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  return new Intl.NumberFormat(format, options).format(amount);
};

export default formatCurrency;
