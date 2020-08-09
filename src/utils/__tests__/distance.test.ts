import { DistanceUnit } from '~/types';

import { convertDistance, formatNumber } from '../distance';

jest.mock('i18next', () => ({
  default: {
    language: 'en-US',
  },
}));

describe('Distance utils', () => {
  it('converts meters to kilometers', () => {
    const result = convertDistance(5500, DistanceUnit.Kilometers);
    expect(result).toBe(5.5);
  });

  it('converts meters to miles', () => {
    const result = convertDistance(41842.944, DistanceUnit.Miles);
    expect(result).toBe(26);
  });

  it('formats numbers to hundredths place for US locale', () => {
    const result = formatNumber(1202.17845);
    expect(result).toBe('1,202.18');
  });
});
