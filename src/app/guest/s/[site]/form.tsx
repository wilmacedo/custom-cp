'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authorizeGuest } from '@/services/unifi/authorize-guest';
import { loginToUniFi } from '@/services/unifi/login';
import { logoutFromUniFi } from '@/services/unifi/logout';

export function AuthForm() {
  const [otp, setOtp] = useState('');
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const macAddress = params.get('ap');
    if (!macAddress) {
      toast.error('Endereço MAC não encontrado');
      return;
    }

    startTransition(async () => {
      const { success: loggedIn } = await loginToUniFi();
      if (!loggedIn) {
        toast.error('Erro ao fazer login no UniFi');
        return;
      }

      const { success: authorized } = await authorizeGuest(macAddress);
      if (!authorized) {
        toast.error('Erro ao autorizar convidado');
        return;
      }

      const { success: loggedOut } = await logoutFromUniFi();
      if (!loggedOut) {
        toast.success('Oops! Houve um erro misterioso mas você foi autorizado!');
      }

      router.push('/success');
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="grid gap-6 place-items-center">
          <InputOTP disabled={isPending} inputMode="numeric" maxLength={3} onChange={setOtp} value={otp}>
            <InputOTPGroup>
              <InputOTPSlot className="text-3xl" index={0} />
              <InputOTPSlot className="text-3xl" index={1} />
              <InputOTPSlot className="text-3xl" index={2} />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full" disabled={isPending || otp.length !== 3} type="submit">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Autorizando...
              </>
            ) : (
              'Acessar'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
