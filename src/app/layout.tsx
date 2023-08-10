import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Juan books',
  description: 'The books of Juan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <main className='px-4 m-auto max-w-screen grid min-h-screen grid-rows-[60px, 1fr,60px] gap-4'>
          <nav className='flex items-center text-3xl text-cyan-500 font-semibold mt-2'>¡Buscá tus libros favoritos!</nav>
        {children}
        <footer className='flex items-center text-xl justify-center'>Con ♥ by Juan</footer>
        </main>
      </body>
    </html>
  )
}
