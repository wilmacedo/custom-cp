'use server';

import { uniFiControllerResponseSchema } from '@/app/types/unifi-controller';
import { env } from '@/env';

interface LoginResult {
  error?: string;
  success: boolean;
}

export async function loginToUniFi(): Promise<LoginResult> {
  const request = await fetch(`${env.UNIFI_CONTROLLER_URL}/api/login`, {
    body: JSON.stringify({
      password: env.UNIFI_PASSWORD,
      username: env.UNIFI_USERNAME,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (!request.ok) {
    const errorText = await request.text();
    return {
      error: errorText,
      success: false,
    };
  }

  const response = await request.json();
  const { data, success } = uniFiControllerResponseSchema.safeParse(response);
  if (!success) {
    return {
      error: 'Invalid response from UniFi controller',
      success: false,
    };
  }
  if (data.meta.rc === 'error') {
    return {
      error: data.meta.msg,
      success: false,
    };
  }

  return { success: true };
}
