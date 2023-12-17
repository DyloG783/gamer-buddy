import './globals.css'
import SessionProvider from "../lib/SessionProvider"
import { getServerSession } from "next-auth"
import NavigationBar from "@/components/navigation/NavigationBar"
import Footer from '../components/Footer'

export const metadata = {
  title: 'Gamer Buddy',
  description: 'Team up with others on you favourate games'
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-slate-200 text-sm md:text-base lg:text-lg'>
        <SessionProvider session={session}>
          <header className='bg-slate-400 '>
            <NavigationBar />
          </header>
          <main className='grow flex md:w-3/4 mx-auto'>
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
