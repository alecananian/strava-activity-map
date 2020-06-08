import i18n from 'i18next';

import { DistanceUnit } from '~/types';

export const convertDistance = (meters: number, targetUnits: DistanceUnit): number => (
  (meters / (targetUnits === DistanceUnit.Kilometers ? 1000 : 1609.344))
);

export const getDefaultDistanceUnits = (): DistanceUnit => {
  const isUntiedStates = (
    i18n.language.toLowerCase().includes('-us')
    || (
      navigator.languages
      && navigator.languages.length > 0
      && navigator.languages[0].toLowerCase().includes('-us')
    )
  );
  return isUntiedStates ? DistanceUnit.Miles : DistanceUnit.Kilometers;
};
