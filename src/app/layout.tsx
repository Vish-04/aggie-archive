
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className={dmSans.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
