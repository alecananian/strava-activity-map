import type { IStravaTokenResponse } from '~/types';
import {
  CacheKey,
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
} from './localStorage';

interface IAuthToken {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const setCachedAuthToken = ({
  token_type: tokenType,
  access_token: accessToken,
  refresh_token: refreshToken,
  expires_at: expiresAt,
}: IStravaTokenResponse) => (
  setJSONToLocalStorage(
    CacheKey.AuthToken,
    {
      tokenType,
      accessToken,
      refreshToken,
      expiresAt: expiresAt * 1000,
    },
  )
);

export const getCachedAuthToken = (): IAuthToken | undefined => {
  const result = getJSONFromLocalStorage(CacheKey.AuthToken);
  return (result ? result as IAuthToken : undefined);
};

export const getCachedRefreshToken = (): string | undefined => (
  getCachedAuthToken()?.refreshToken
);

export const getCachedAccessToken = (): string | undefined => {
  const authToken = getCachedAuthToken();
  if (!authToken) {
    return undefined;
  }

  const {
    tokenType,
    accessToken,
    expiresAt,
  } = authToken as IAuthToken;
  if ((new Date().getTime() / 1000) >= expiresAt) {
    return undefined;
  }

  return `${tokenType} ${accessToken}`;
};

export const logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
