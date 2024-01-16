// import { config } from 'dotenv' // https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables
// config({ path: '.env.development.local' })

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google';
import NavigationBar from "@/app/components/navigation/NavigationBar"

export const metadata = {
  title: 'Gamer Buddy',
  description: 'Team up with others on you favourate games'
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className='min-h-screen text-sm md:text-base lg:text-lg
        '
        >
          <header className='max-w-screen-2xl md:h-24 mx-auto
          bg-white shadow-sm'
          >
            <NavigationBar />
          </header>
          <main className='h-[calc(100vh-6rem)] max-w-screen-2xl mx-auto'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider >
  )
}
