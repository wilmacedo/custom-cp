'use client';

import { GalleryVerticalEnd, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { authenticateOTP } from './actions';

export default function Home() {
  const [otp, setOtp] = useState('');
  const [isPending, startTransition] = useTransition();

  const [clientInfo, setClientInfo] = useState('');

  const router = useRouter();

  useEffect(() => {
    setClientInfo(window.location.toString());
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);

    startTransition(async () => {
      const result = await authenticateOTP(otp, params.get('ap') ?? '');

      if (result.success) {
        toast.success(result.message);
        router.push('/success');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a className="flex items-center gap-2 self-center font-medium" href="#">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          wiLLnet
        </a>

        <span>{clientInfo}</span>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Olá, convidado</CardTitle>
              <CardDescription>
                Digite o código <span className="line-through">misterioso</span> para acessar a rede 🥸
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
