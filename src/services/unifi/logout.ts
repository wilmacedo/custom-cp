'use server';

import { uniFiClient } from '@/lib/unifi-client';

interface LogoutResult {
  error?: string;
  success: boolean;
}

export async function logoutFromUniFi(): Promise<LogoutResult> {
  const response = await uniFiClient.post('/api/logout');
  return { success: response.status === 200 };
}
