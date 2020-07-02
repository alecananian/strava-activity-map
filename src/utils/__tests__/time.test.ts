import { displayTime } from '../time';

describe('Time utils', () => {
  it('formats time with seconds', () => {
    let result = displayTime(5);
    expect(result).toBe('0:05');

    result = displayTime(30);
    expect(result).toBe('0:30');
  });

  it('formats time with minutes and seconds', () => {
    let result = displayTime(60);
    expect(result).toBe('1:00');

    result = displayTime(69);
    expect(result).toBe('1:09');

    result = displayTime(1917);
    expect(result).toBe('31:57');
  });

  it('formats time with hours, minutes and seconds', () => {
    let result = displayTime(3600);
    expect(result).toBe('1:00:00');

    result = displayTime(3657);
    expect(result).toBe('1:00:57');

    result = displayTime(7077);
    expect(result).toBe('1:57:57');

    result = displayTime(43077);
    expect(result).toBe('11:57:57');
  });
});
