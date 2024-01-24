import './globals.css'
import NavigationBar from "@/app/components/NavigationBar"
import { ClerkProvider } from '@clerk/nextjs'
// import { Inter } from 'next/font/google';
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Gamer Buddy',
  description: 'Team up with others on you favourate games'
}

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (

    <ClerkProvider>
      <html lang="en" className={''}>
        <body className='min-h-screen text-sm md:text-base lg:text-lg '>
          {/* <body className='min-h-screen text-sm md:text-base lg:text-lg dark text-foreground bg-background'> */}
          <Providers>
            <header className='max-w-screen-2xl mx-auto shadow-sm'>
              <NavigationBar />
            </header>
            <main className='h-[calc(100vh-5.5rem)] max-w-screen-2xl mx-auto '>
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
