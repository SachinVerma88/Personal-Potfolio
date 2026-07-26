import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/sections/Footer';
import { SITE_DATA } from '@/data/content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_DATA.identity.name} — ${SITE_DATA.identity.role}`,
  description: SITE_DATA.identity.subhead,
  icons: {
    icon: '/favicon.svg',
  },
  keywords: [
    'Full Stack Engineer',
    'AI Engineer',
    'SaaS Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Python FastAPI',
    'Consultant',
    'Sachin Verma',
  ],
  authors: [{ name: SITE_DATA.identity.name }],
  openGraph: {
    title: `${SITE_DATA.identity.name} — ${SITE_DATA.identity.role}`,
    description: SITE_DATA.identity.subhead,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-[#09090b] text-zinc-100 antialiased selection:bg-sky-500/20 selection:text-sky-300">
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
