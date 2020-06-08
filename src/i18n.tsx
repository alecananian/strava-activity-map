import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from '~/../locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    whitelist: Object.keys(resources),
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
