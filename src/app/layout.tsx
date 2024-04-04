import './globals.css';
import Navigation from "@/app/components/Navigation";
import { ClerkProvider } from '@clerk/nextjs';
import { shadesOfPurple } from "@clerk/themes";
import { Inter } from 'next/font/google';
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: 'Gamer Buddy',
  description: 'Team up with others on your favourate games'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <ClerkProvider appearance={{
      baseTheme: shadesOfPurple
    }}>
      <html lang="en" className={`${inter.className}`}>
        <body className='text-sm md:text-base lg:text-lg bg-slate-200 dark:bg-neutral-800'>
          {/* <body className='min-h-screen text-sm md:text-base lg:text-lg dark text-foreground bg-background'> */}
          <Providers>
            <header className='max-w-screen-2xl mx-auto shadow-sm'>
              <Navigation />
            </header>
            <main className='full-height-minus-nav max-w-screen-2xl mx-auto'>
              {children}
            </main>
          </Providers>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider >


  )
}
