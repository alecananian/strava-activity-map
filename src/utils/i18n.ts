import i18n from 'i18next';

export const getAvailableLanguages = () => (
  Object.keys(i18n.options.resources!)
);

export const changeLanguage = (language: string) => (
  i18n.changeLanguage(language)
);
