import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

import { env } from '@/env';

// Persist cookie session between requests
const jar = new CookieJar();

export const uniFiClient = wrapper(
  axios.create({
    baseURL: env.UNIFI_CONTROLLER_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    jar,
    validateStatus: () => true,
    withCredentials: true,
  }),
);
