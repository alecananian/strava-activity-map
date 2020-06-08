export default {
  StravaClientId: parseInt(process.env.STRAVA_CLIENT_ID || '', 10),
  StravaRedirectUri: process.env.STRAVA_REDIRECT_URI || window.location.origin,
  StravaAuthScope: process.env.STRAVA_AUTH_SCOPE || 'profile:read_all,activity:read_all',
  StravaOAuthTokenApiEndpoint: process.env.STRAVA_OAUTH_TOKEN_API_ENDPOINT || 'https://www.strava.com/api/v3/oauth/token',
  StravaOAuthTokenApiKey: process.env.STRAVA_OAUTH_TOKEN_API_KEY,
};
