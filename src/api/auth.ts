import axios from 'axios';

import config from '~/config';
import type { IStravaTokenRequest, IStravaTokenResponse } from '~/types';
import { setCachedAuthToken } from '~/utils/auth';

const {
  StravaClientId,
  StravaRedirectUri,
  StravaAuthScope,
  StravaOAuthTokenApiEndpoint,
  StravaOAuthTokenApiKey,
} = config;

export const logIn = (
  clientId: number = StravaClientId,
  redirectUri: string = StravaRedirectUri,
  scope: string = StravaAuthScope,
) => {
  window.open(
    `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&approval_prompt=auto&scope=${scope}`,
    '_self',
  );
};

export const getAuthToken = async (
  params: Partial<IStravaTokenRequest>,
): Promise<IStravaTokenResponse> => {
  const headers: any = {};
  if (StravaOAuthTokenApiKey) {
    headers['x-api-key'] = StravaOAuthTokenApiKey;
  }

  const { data } = await axios.post(StravaOAuthTokenApiEndpoint, params, { headers });
  setCachedAuthToken(data);
  return data as IStravaTokenResponse;
};

export const getAuthTokenByCode = async (
  code: string,
): Promise<IStravaTokenResponse> => (
  getAuthToken({
    grant_type: 'authorization_code',
    code,
  })
);

export const getAuthTokenByRefreshToken = async (
  refreshToken: string,
): Promise<IStravaTokenResponse> => (
  getAuthToken({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
);
