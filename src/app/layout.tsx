import type { Metadata } from 'next';

import '@/styles/globals.css';

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
      <body>{children}</body>
    </html>
  );
}
