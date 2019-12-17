import formatCurrency from '../formatCurrency';

describe('formatCurrency', () => {
  describe('default options', () => {
    it('returns GBP currency formatted to 2 decimal places', () => {
      expect(formatCurrency({ amount: 8 })).toEqual('£8.00');
    });
  });

  describe('custom options', () => {
    const options = {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    };

    it('returns formatted custom currency', () => {
      expect(formatCurrency({ amount: 8, options })).toEqual('€8');
    });
  });
});
