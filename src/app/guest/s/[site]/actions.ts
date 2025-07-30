'use server';

import { revalidatePath } from 'next/cache';

import { env } from '@/env';

const VALID_OTP = '901';

interface AuthorizeGuestOptions {
  apMac?: string;
  mac: string;
  minutes: number;
}

interface AuthResult {
  data?: {
    authorizedAt: string;
  };
  message: string;
  success: boolean;
}

interface UniFiAuthResponse {
  data?: unknown;
  message: string;
  success: boolean;
}

export async function authenticateOTP(otp: string, macAddress: string): Promise<AuthResult> {
  try {
    if (otp !== VALID_OTP) {
      return {
        message: 'Código OTP inválido',
        success: false,
      };
    }

    const authResult = await authenticateWithUniFi(macAddress);
    if (!authResult.success) {
      return {
        message: authResult.message,
        success: false,
      };
    }

    revalidatePath('/');

    return {
      data: {
        authorizedAt: new Date().toISOString(),
      },
      message: 'Autorização realizada com sucesso',
      success: true,
    };
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return {
      message: 'Erro interno do servidor',
      success: false,
    };
  }
}

async function authenticateWithUniFi(macAddress: string): Promise<UniFiAuthResponse> {
  try {
    const loginResponse = await fetch(`${env.UNIFI_CONTROLLER_URL}/api/login`, {
      body: JSON.stringify({
        password: env.UNIFI_PASSWORD,
        username: env.UNIFI_USERNAME,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      throw new Error(`Falha no login no UniFi Controller: ${loginResponse.status} - ${errorText}`);
    }

    const authResult = await authorizeGuest({
      mac: macAddress,
      minutes: 3,
    });

    if (!authResult.success) {
      throw new Error(authResult.message);
    }

    await logoutFromUniFi();

    return {
      message: 'Cliente autorizado com sucesso',
      success: true,
    };
  } catch (error) {
    console.error('Erro na autenticação UniFi:', error);
    return {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      success: false,
    };
  }
}

async function authorizeGuest(options: AuthorizeGuestOptions): Promise<UniFiAuthResponse> {
  try {
    const payload: Record<string, number | string> = {
      cmd: 'authorize-guest',
      mac: options.mac.toLowerCase(),
      minutes: options.minutes,
    };

    const response = await fetch(`${env.UNIFI_CONTROLLER_URL}/api/s/${env.UNIFI_SITE}/cmd/stamgr`, {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha na autorização do cliente: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    if (!responseData || responseData.meta?.rc !== 'ok') {
      throw new Error('Resposta inválida do UniFi Controller');
    }

    return {
      message: 'Cliente autorizado com sucesso',
      success: true,
    };
  } catch (error) {
    console.error('Erro na autorização do guest:', error);
    return {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      success: false,
    };
  }
}

async function logoutFromUniFi(): Promise<void> {
  try {
    await fetch(`${env.UNIFI_CONTROLLER_URL}/api/logout`, {
      method: 'POST',
    });
  } catch (error) {
    console.warn('Erro ao fazer logout do UniFi Controller:', error);
  }
}
