import axios from 'axios';

import { getCachedAccessToken } from '~/utils/auth';

const client = axios.create({
  baseURL: 'https://www.strava.com/api/v3',
});

client.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers || {},
    authorization: getCachedAccessToken(),
  },
}), (err) => Promise.reject(err));

client.interceptors.response.use((response) => (
  (response && response.data) || response
), (err) => Promise.reject(err));

export default client;
