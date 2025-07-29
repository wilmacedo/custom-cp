import { GalleryVerticalEnd } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function Home() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a className="flex items-center gap-2 self-center font-medium" href="#">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          wiLLnet
        </a>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Olá, convidado</CardTitle>
              <CardDescription>
                Digite o código <span className="line-through">misterioso</span> para acessar a rede 🥸
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="grid gap-6 place-items-center">
                    <InputOTP inputMode="numeric" maxLength={3}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-3xl" index={0} />
                        <InputOTPSlot className="text-3xl" index={1} />
                        <InputOTPSlot className="text-3xl" index={2} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button className="w-full" type="submit">
                      Acessar
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
