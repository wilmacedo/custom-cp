'use server';

import { uniFiControllerResponseSchema } from '@/app/types/unifi-controller';
import { env } from '@/env';
import { uniFiClient } from '@/lib/unifi-client';

interface LoginResult {
  error?: string;
  success: boolean;
}

export async function loginToUniFi(): Promise<LoginResult> {
  const response = await uniFiClient.post('/api/login', {
    password: env.UNIFI_PASSWORD,
    username: env.UNIFI_USERNAME,
  });

  const parsed = uniFiControllerResponseSchema.safeParse(response.data);
  if (!parsed.success || parsed.data.meta.rc !== 'ok') {
    return {
      error: parsed.success ? parsed.data.meta.msg : 'Resposta inválida do controlador UniFi',
      success: false,
    };
  }

  return { success: true };
}
