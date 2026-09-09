import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Libre_Franklin } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ variable: '--font-display', subsets: ['latin'], weight: ['500', '600', '700'] });
const sans = Libre_Franklin({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600'] });
const mono = IBM_Plex_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'The Red — Ten Thousand Gates',
  description: 'Stories, people, and places from the world beyond the doors.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
