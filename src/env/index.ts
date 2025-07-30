import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  runtimeEnv: {
    UNIFI_CONTROLLER_URL: process.env.UNIFI_CONTROLLER_URL,
    UNIFI_PASSWORD: process.env.UNIFI_PASSWORD,
    UNIFI_SITE: process.env.UNIFI_SITE,
    UNIFI_USERNAME: process.env.UNIFI_USERNAME,
  },
  server: {
    UNIFI_CONTROLLER_URL: z.url().default('https://192.168.0.1:8443'),
    UNIFI_PASSWORD: z.string().default('password'),
    UNIFI_SITE: z.string().default('default'),
    UNIFI_USERNAME: z.string().default('admin'),
  },
});
