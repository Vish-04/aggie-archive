// app/layout.tsx
import './globals.css'
import { DM_Sans } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'

// Import DM Sans with the weights you want (400, 600, 700)
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-dm-sans', // optional CSS variable
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
