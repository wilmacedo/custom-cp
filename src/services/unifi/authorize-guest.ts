'use server';

import { uniFiControllerResponseSchema } from '@/app/types/unifi-controller';
import { env } from '@/env';
import { uniFiClient } from '@/lib/unifi-client';

export async function authorizeGuest(macAddress: string) {
  const response = await uniFiClient.post(`/api/s/${env.UNIFI_SITE}/cmd/stamgr`, {
    cmd: 'authorize-guest',
    mac: macAddress.toLowerCase(),
    minutes: 3,
  });

  const parsed = uniFiControllerResponseSchema.safeParse(response.data);
  if (!parsed.success || parsed.data.meta.rc === 'error') {
    return {
      error: parsed.success ? parsed.data.meta.msg : 'Resposta inválida do controlador UniFi',
      success: false,
    };
  }

  return { success: true };
}
