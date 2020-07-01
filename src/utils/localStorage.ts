export enum CacheKey {
  AuthToken = 'strava.authToken',
  User = 'strava.user',
  Activities = 'strava.activities',
  SettingsContext = 'context.settings',
  ThemeContext = 'context.theme',
}

export const setJSONToLocalStorage = (key: string, obj: object) => (
  localStorage.setItem(key, JSON.stringify(obj))
);

export const getJSONFromLocalStorage = (key: string): any => {
  const cachedString = localStorage.getItem(key);
  if (!cachedString) {
    return undefined;
  }

  try {
    const result = JSON.parse(cachedString);
    return result;
  } catch (err) {
    return undefined;
  }
};

export const removeFromLocalStorage = (key: string) => (
  localStorage.removeItem(key)
);
