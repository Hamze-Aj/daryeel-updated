import type { Metadata } from 'next';
import './globals.css';
import SiteInteractions from '../components/SiteInteractions';

export const metadata: Metadata = {
  title: 'Daryeel Rural Development For Action',
  description:
    'A diaspora-led nonprofit supporting education and community development in the Somali Region of Ethiopia.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteInteractions />
      </body>
    </html>
  );
}