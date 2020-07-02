import { prefersDarkMode } from '../theme';

describe('Theme utils', () => {
  it('detects dark mode preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
      })),
    });

    const result = prefersDarkMode();
    expect(result).toBeTruthy();
  });

  it('detects light mode preference', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
    });

    const result = prefersDarkMode();
    expect(result).toBeFalsy();
  });
});
