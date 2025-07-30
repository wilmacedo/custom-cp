'use server';

import { uniFiControllerResponseSchema } from '@/app/types/unifi-controller';
import { env } from '@/env';

interface LogoutResult {
  error?: string;
  success: boolean;
}

export async function logoutFromUniFi(): Promise<LogoutResult> {
  const request = await fetch(`${env.UNIFI_CONTROLLER_URL}/api/logout`, {
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
