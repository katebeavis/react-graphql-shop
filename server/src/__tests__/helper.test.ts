import { hasPermission } from '../helpers/permissions';

describe('default options', () => {
  it("throws an error if permissions don't match", () => {
    expect(() => {
      hasPermission(['read'], ['write']);
    }).toThrow();
  });
});
