import i18n from 'i18next';

import {
  getAvailableLanguages,
  changeLanguage,
} from '../i18n';

jest.mock('i18next', () => ({
  default: {
    changeLanguage: jest.fn(),
    options: {
      resources: {
        en: {
          language: 'English',
        },
        ru: {
          language: 'Russian',
        },
      },
    },
  },
}));

describe('i18n utils', () => {
  it('gets available languages', () => {
    const result = getAvailableLanguages();
    expect(result).toStrictEqual(['en', 'ru']);
  });

  it('changes language', () => {
    changeLanguage('ru');
    expect(i18n.changeLanguage).toHaveBeenCalledWith('ru');
  });
});
