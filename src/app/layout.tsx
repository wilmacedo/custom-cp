import type { Metadata } from 'next';

import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  description: 'Custom Captive Portal for UniFi Controller',
  title: 'Custom Captive Portal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
