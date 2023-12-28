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
        <body className='min-h-screen bg-slate-200 text-sm md:text-base lg:text-lg'>
          <header className='bg-slate-400 '>
            <NavigationBar />
          </header>
          {/* <main className='grow flex flex-col md:w-3/4 mx-auto'> */}
          <main className=' flex w-full justify-around'>
            {children}
          </main>
          {/* <footer>
            <Footer />
          </footer> */}
        </body>
      </html>
    </ClerkProvider>
  )
}
