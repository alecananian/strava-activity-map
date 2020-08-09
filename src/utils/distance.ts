import i18n from 'i18next';

import { DistanceUnit } from '~/types';

export const convertDistance = (meters: number, targetUnits: DistanceUnit): number => (
  (meters / (targetUnits === DistanceUnit.Kilometers ? 1000 : 1609.344))
);

export const formatNumber = (num: number) => (
  new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 2 }).format(num)
);

export const getDefaultDistanceUnits = (): DistanceUnit => {
  const isUnitedStates = (
    i18n.language.toLowerCase().includes('-us')
    || (
      navigator.languages
      && navigator.languages.length > 0
      && navigator.languages[0].toLowerCase().includes('-us')
    )
  );
  return isUnitedStates ? DistanceUnit.Miles : DistanceUnit.Kilometers;
};
