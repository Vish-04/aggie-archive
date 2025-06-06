
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DM_Sans } from 'next/font/google';
import Header from "@/components/header";
import Footer from "@/components/Footer"

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className={dmSans.className}>
        <UserProvider>
          <Header></Header>
          {children}
          <Footer></Footer>
        </UserProvider>
      </body>
    </html>
  );
}
