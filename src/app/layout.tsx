import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavigationBar from "@/app/components/navigation/NavigationBar"
import Footer from './components/Footer'

export const metadata = {
  title: 'Gamer Buddy',
  description: 'Team up with others on you favourate games'
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className='min-h-screen text-sm md:text-base lg:text-lg bg-gray-400'>
          <header className='bg-slate-500 max-w-screen-2xl md:h-24 mx-auto'>
            <NavigationBar />
          </header>
          <main className='h-[calc(100vh-6rem)] max-w-screen-2xl mx-auto'>
            {children}
          </main>
          {/* <footer>
            <Footer />
          </footer> */}
        </body>
      </html>
    </ClerkProvider >
  )
}
